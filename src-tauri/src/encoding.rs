use base64::{engine::general_purpose, DecodeError, Engine as _};

pub fn base64_decode<T: AsRef<[u8]>>(input: T) -> Result<Vec<u8>, DecodeError> {
    general_purpose::STANDARD.decode(input)
}
