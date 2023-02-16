import {
  EmptyHashTreeNodeDto,
  ForkHashTreeNodeDto,
  HashTreeNodeDto,
  LabeledHashTreeNodeDto,
  LeafHashTreeNodeDto,
  PrunedHashTreeNodeDto,
} from "./canister-http-response-dto.types";

export function isForkHashTreeNode(
  hashTreeNode: HashTreeNodeDto
): hashTreeNode is ForkHashTreeNodeDto {
  return "Fork" in hashTreeNode;
}

export function isLabeledHashTreeNode(
  hashTreeNode: HashTreeNodeDto
): hashTreeNode is LabeledHashTreeNodeDto {
  return "Labeled" in hashTreeNode;
}

export function isLeafHashTreeNode(
  hashTreeNode: HashTreeNodeDto
): hashTreeNode is LeafHashTreeNodeDto {
  return "Leaf" in hashTreeNode;
}

export function isPrunedHashTreeNode(
  hashTreeNode: HashTreeNodeDto
): hashTreeNode is PrunedHashTreeNodeDto {
  return "Pruned" in hashTreeNode;
}

export function isEmptyHashTreeNode(
  hashTreeNode: HashTreeNodeDto
): hashTreeNode is EmptyHashTreeNodeDto {
  return "Empty" in hashTreeNode;
}
