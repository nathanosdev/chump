use ic_agent::{agent::http_transport::ReqwestHttpReplicaV2Transport, Agent};

pub fn create_agent(url: &str) -> Agent {
    let transport = ReqwestHttpReplicaV2Transport::create(url).unwrap();

    Agent::builder().with_transport(transport).build().unwrap()
}
