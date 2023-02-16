import {
  EmptyHashTreeNodeDto,
  ForkHashTreeNodeDto,
  HashTreeDto,
  HashTreeNodeDto,
  LabeledHashTreeNodeDto,
  LeafHashTreeNodeDto,
  PrunedHashTreeNodeDto,
} from "./canister-http-response-dto.types";
import {
  isEmptyHashTreeNode,
  isForkHashTreeNode,
  isLabeledHashTreeNode,
  isLeafHashTreeNode,
  isPrunedHashTreeNode,
} from "./canister-http-response-dto.utils";
import {
  EmptyHashTreeNode,
  ForkHashTreeNode,
  HashTree,
  HashTreeNode,
  LabeledHashTreeNode,
  LeafHashTreeNode,
  PrunedHashTreeNode,
} from "./canister-http-response.types";

export function mapHashTree(
  hashTree: HashTreeDto | null
): HashTree | undefined {
  if (!hashTree) {
    return;
  }

  return {
    digest: hashTree.digest,
    root: mapHashTreeNode(hashTree.root),
  };
}

function mapHashTreeNode(hashTreeNode: HashTreeNodeDto): HashTreeNode {
  if (isEmptyHashTreeNode(hashTreeNode)) {
    return mapEmptyHashTreeNode(hashTreeNode);
  }

  if (isForkHashTreeNode(hashTreeNode)) {
    return mapForkHashTreeNode(hashTreeNode);
  }

  if (isLabeledHashTreeNode(hashTreeNode)) {
    return mapLabeledHashTreeNode(hashTreeNode);
  }

  if (isLeafHashTreeNode(hashTreeNode)) {
    return mapLeafHashTreeNode(hashTreeNode);
  }

  if (isPrunedHashTreeNode(hashTreeNode)) {
    return mapPrunedHashTreeNode(hashTreeNode);
  }

  throw "Unrecognized hash tree node type";
}

function mapEmptyHashTreeNode(
  _hashTreeNode: EmptyHashTreeNodeDto
): EmptyHashTreeNode {
  return {
    type: "empty",
  };
}

function mapForkHashTreeNode(
  hashTreeNode: ForkHashTreeNodeDto
): ForkHashTreeNode {
  return {
    type: "fork",
    left: mapHashTreeNode(hashTreeNode.Fork.left),
    right: mapHashTreeNode(hashTreeNode.Fork.right),
  };
}

function mapLabeledHashTreeNode(
  hashTreeNode: LabeledHashTreeNodeDto
): LabeledHashTreeNode {
  return {
    type: "labeled",
    label: hashTreeNode.Labeled.label,
    child: mapHashTreeNode(hashTreeNode.Labeled.child),
  };
}

function mapLeafHashTreeNode(
  hashTreeNode: LeafHashTreeNodeDto
): LeafHashTreeNode {
  return {
    type: "leaf",
    content: hashTreeNode.Leaf.content,
  };
}

function mapPrunedHashTreeNode(
  hashTreeNode: PrunedHashTreeNodeDto
): PrunedHashTreeNode {
  return {
    type: "pruned",
    content: hashTreeNode.Pruned.content,
  };
}
