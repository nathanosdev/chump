export interface EmptyHashTreeNode {
  type: "empty";
}

export interface ForkHashTreeNode {
  type: "fork";
  left: HashTreeNode;
  right: HashTreeNode;
}

export interface LabeledHashTreeNode {
  type: "labeled";
  label: string;
  child: HashTreeNode;
}

export interface PrunedHashTreeNode {
  type: "pruned";
  content: string;
}

export interface LeafHashTreeNode {
  type: "leaf";
  content: string;
}

export type HashTreeNode =
  | EmptyHashTreeNode
  | ForkHashTreeNode
  | LabeledHashTreeNode
  | LeafHashTreeNode
  | PrunedHashTreeNode;

export interface HashTree {
  digest: string;
  root: HashTreeNode;
}

export interface Certificate {
  tree: HashTree;
  signature: string;
  delegation: Delegation | undefined;
}

export interface Delegation {
  subnetId: number[];
  certificate: HashTree;
}

export interface CanisterHttpResponse {
  response: {
    statusCode: number;
    headers: [string, string][];
    body: string;
  };
  hashTree?: HashTree;
  certificate?: Certificate;
}
