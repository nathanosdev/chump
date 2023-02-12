use crate::{encoding::base64_decode, hash_tree::PrettyHashTree};
use anyhow::{Ok, Result};
use ic_certification::{Certificate, Delegation, HashTree};
use lazy_regex::regex_captures;

pub fn decode_certificate_header(header: &str) -> (Option<Certificate>, Option<HashTree>) {
    let mut certificate: Option<Certificate> = None;
    let mut hash_tree: Option<HashTree> = None;

    for field in header.split(",") {
        if let Some((_, name, value)) = regex_captures!("^(.*)=:(.*):$", field) {
            let name = name.trim();
            let value = value.trim();

            if name.eq_ignore_ascii_case("certificate") {
                certificate = decode_certificate(value).ok();
            } else if name.eq_ignore_ascii_case("tree") {
                hash_tree = decode_hash_tree(value).ok();
            }
        }
    }

    (certificate, hash_tree)
}

fn decode_certificate(certificate: &str) -> Result<Certificate> {
    let certificate = base64_decode(certificate)?;
    let certificate: Certificate = serde_cbor::from_slice(&certificate)?;

    Ok(certificate)
}

fn decode_hash_tree(hash_tree: &str) -> Result<HashTree> {
    let hash_tree = base64_decode(hash_tree)?;
    let hash_tree: HashTree = serde_cbor::from_slice(&hash_tree)?;

    Ok(hash_tree)
}

#[derive(Debug, serde::Serialize)]
pub struct PrettyCertificate {
    pub tree: PrettyHashTree,
    pub signature: String,
    pub delegation: Option<PrettyDelegation>,
}

impl<'a> From<Certificate<'a>> for PrettyCertificate {
    fn from(certificate: Certificate) -> Self {
        let tree = PrettyHashTree::from(certificate.tree);
        let signature = hex::encode(certificate.signature);
        let delegation = certificate
            .delegation
            .map(|delegation| PrettyDelegation::from(delegation));

        PrettyCertificate {
            tree,
            signature,
            delegation,
        }
    }
}

#[derive(Debug, serde::Serialize)]
pub struct PrettyDelegation {
    pub subnet_id: Vec<u8>,
    pub certificate: PrettyHashTree,
}

impl From<Delegation> for PrettyDelegation {
    fn from(delegation: Delegation) -> Self {
        let certificate: HashTree = serde_cbor::from_slice(&delegation.certificate).unwrap();

        PrettyDelegation {
            subnet_id: delegation.subnet_id,
            certificate: PrettyHashTree::from(certificate),
        }
    }
}
