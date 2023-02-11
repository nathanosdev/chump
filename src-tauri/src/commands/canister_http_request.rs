use std::io::Read;

use anyhow::Result;
use flate2::read::{DeflateDecoder, GzDecoder};
use ic_agent::export::Principal;
use ic_utils::{
    call::SyncCall,
    interfaces::{
        http_request::{HeaderField, HttpResponse},
        HttpRequestCanister,
    },
};

use crate::agent::create_agent;

#[derive(Debug, serde::Serialize)]
pub struct CanisterHttpResponseDto {
    pub status_code: u16,
    pub headers: Vec<(String, String)>,
    pub body: String,
}

#[derive(Debug, serde::Serialize)]
pub struct CanisterHttpRequestDto {
    response: CanisterHttpResponseDto,
}

#[tauri::command]
pub async fn canister_http_request(
    gateway: &str,
    canister_id: &str,
    path: &str,
) -> Result<CanisterHttpRequestDto, ()> {
    let agent = create_agent(gateway);
    let canister_id = Principal::from_text(canister_id).unwrap();
    let canister = HttpRequestCanister::create(&agent, canister_id);

    let (response,) = canister
        .http_request("get", path, [], &[])
        .call()
        .await
        .unwrap();

    Ok(CanisterHttpRequestDto {
        response: map_response(response),
    })
}

#[derive(Debug)]
struct ParsedHeaders {
    encoding: Option<String>,
}

fn parse_headers(response: &HttpResponse) -> ParsedHeaders {
    let mut encoding: Option<String> = None;

    for HeaderField(key, value) in &response.headers {
        if key.eq_ignore_ascii_case("Content-Encoding") {
            encoding = Some(value.to_owned().to_string())
        }
    }

    ParsedHeaders { encoding }
}

fn map_response(response: HttpResponse) -> CanisterHttpResponseDto {
    let parsed_headers = parse_headers(&response);

    let status_code = response.status_code;
    let headers = response
        .headers
        .iter()
        .map(|HeaderField(key, value)| {
            let key = key.to_owned();
            let value = value.to_owned();

            (String::from(key), String::from(value))
        })
        .collect::<Vec<(String, String)>>();
    let body = decode_body(&response.body, parsed_headers.encoding).unwrap();
    let body = String::from_utf8(body).unwrap();

    CanisterHttpResponseDto {
        status_code,
        headers,
        body,
    }
}

// The limit of a buffer we should decompress ~10mb.
const MAX_CHUNK_SIZE_TO_DECOMPRESS: usize = 1024;
const MAX_CHUNKS_TO_DECOMPRESS: u64 = 10_240;

fn decode_body(body: &[u8], encoding: Option<String>) -> Option<Vec<u8>> {
    match encoding.as_deref() {
        Some("gzip") => body_from_decoder(GzDecoder::new(body)),
        Some("deflate") => body_from_decoder(DeflateDecoder::new(body)),
        _ => Some(body.to_vec()),
    }
}

fn body_from_decoder<D: Read>(mut decoder: D) -> Option<Vec<u8>> {
    let mut decoded = Vec::new();
    let mut buffer = [0u8; MAX_CHUNK_SIZE_TO_DECOMPRESS];

    for _ in 0..MAX_CHUNKS_TO_DECOMPRESS {
        let bytes = decoder.read(&mut buffer).ok()?;

        if bytes == 0 {
            return Some(decoded);
        }

        decoded.extend_from_slice(&buffer[..bytes]);
    }

    if decoder.bytes().next().is_some() {
        return None;
    }

    Some(decoded)
}
