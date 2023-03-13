use ic_agent::export::Principal;
use ic_utils::{
    call::SyncCall,
    interfaces::{
        http_request::{HeaderField, HttpResponse},
        HttpRequestCanister,
    },
};

use crate::{
    agent::create_agent,
    certificate::{decode_certificate_header, PrettyCertificate},
};
use crate::{body::decode_body, hash_tree::PrettyHashTree};

#[derive(Debug, serde::Serialize)]
pub struct CanisterHttpResponseDto {
    pub status_code: u16,
    pub headers: Vec<(String, String)>,
    pub body: String,
}

#[derive(Debug, serde::Serialize)]
pub struct CanisterHttpRequestDto {
    response: CanisterHttpResponseDto,
    certificate: Option<PrettyCertificate>,
    hash_tree: Option<PrettyHashTree>,
}

#[tauri::command]
pub async fn canister_http_request<'a>(
    gateway: &str,
    canister_id: &str,
    path: &str,
) -> Result<CanisterHttpRequestDto, ()> {
    let agent = create_agent(gateway);
    let canister_id = Principal::from_text(canister_id).unwrap();
    let canister = HttpRequestCanister::create(&agent, canister_id);

    let (response,) = canister
        .http_request("get", path, [], &[], None)
        .call()
        .await
        .unwrap();

    let parsed_headers = parse_headers(&response);

    let parsed_certificate_header = parsed_headers
        .certificate
        .as_ref()
        .map(|certificate_header| decode_certificate_header(certificate_header));

    let certificate = parsed_certificate_header
        .as_ref()
        .and_then(|(certificate, _)| {
            certificate
                .as_ref()
                .map(|certificate| PrettyCertificate::from(certificate.clone()))
        });
    let hash_tree = parsed_certificate_header
        .as_ref()
        .and_then(|(_, hash_tree)| {
            hash_tree
                .as_ref()
                .map(|hash_tree| PrettyHashTree::from(hash_tree.clone()))
        });

    Ok(CanisterHttpRequestDto {
        response: map_response(&response, &parsed_headers),
        certificate,
        hash_tree,
    })
}

#[derive(Debug)]
struct ParsedHeaders {
    encoding: Option<String>,
    certificate: Option<String>,
}

fn parse_headers(response: &HttpResponse) -> ParsedHeaders {
    let mut encoding: Option<String> = None;
    let mut certificate: Option<String> = None;

    for HeaderField(key, value) in &response.headers {
        if key.eq_ignore_ascii_case("Content-Encoding") {
            encoding = Some(value.to_owned().to_string());
        } else if key.eq_ignore_ascii_case("IC-Certificate") {
            certificate = Some(value.to_owned().to_string());
        }
    }

    ParsedHeaders {
        encoding,
        certificate,
    }
}

fn map_response(
    response: &HttpResponse,
    parsed_headers: &ParsedHeaders,
) -> CanisterHttpResponseDto {
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
    let body = decode_body(&response.body, &parsed_headers.encoding).unwrap();
    let body = String::from_utf8(body).unwrap();

    CanisterHttpResponseDto {
        status_code,
        headers,
        body,
    }
}
