use flate2::read::{DeflateDecoder, GzDecoder};
use std::io::Read;

// The limit of a buffer we should decompress ~10mb.
const MAX_CHUNK_SIZE_TO_DECOMPRESS: usize = 1024;
const MAX_CHUNKS_TO_DECOMPRESS: u64 = 10_240;

pub fn decode_body(body: &[u8], encoding: &Option<String>) -> Option<Vec<u8>> {
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
