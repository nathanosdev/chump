use ic_agent::hash_tree::{HashTree, HashTreeNode};

#[derive(Debug, serde::Serialize)]
pub struct PrettyHashTree {
    root: PrettyHashTreeNode,
    digest: String,
}

impl<'a> From<HashTree<'a>> for PrettyHashTree {
    fn from(hash_tree: HashTree<'a>) -> Self {
        let digest = hex::encode(hash_tree.digest());
        let root = PrettyHashTreeNode::from(hash_tree.as_ref().clone());

        PrettyHashTree { digest, root }
    }
}

#[derive(Debug, serde::Serialize)]
pub enum PrettyHashTreeNode {
    Empty,
    Fork {
        left: Box<PrettyHashTreeNode>,
        right: Box<PrettyHashTreeNode>,
    },
    Labeled {
        label: String,
        child: Box<PrettyHashTreeNode>,
    },
    Leaf {
        content: String,
    },
    Pruned {
        content: String,
    },
}

impl<'a> From<HashTreeNode<'a>> for PrettyHashTreeNode {
    fn from(hash_tree_node: HashTreeNode) -> Self {
        match hash_tree_node {
            HashTreeNode::Empty() => PrettyHashTreeNode::Empty,
            HashTreeNode::Fork(children) => PrettyHashTreeNode::Fork {
                left: Box::new(PrettyHashTreeNode::from(children.0)),
                right: Box::new(PrettyHashTreeNode::from(children.1)),
            },
            HashTreeNode::Labeled(label, child) => PrettyHashTreeNode::Labeled {
                label: format!("{}", label),
                child: Box::new(PrettyHashTreeNode::from(*child)),
            },
            HashTreeNode::Leaf(content) => PrettyHashTreeNode::Leaf {
                content: hex::encode(content),
            },
            HashTreeNode::Pruned(content) => PrettyHashTreeNode::Pruned {
                content: hex::encode(content),
            },
        }
    }
}
