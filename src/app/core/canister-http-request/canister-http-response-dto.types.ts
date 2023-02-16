export interface EmptyHashTreeNodeDto {
  Empty: {};
}

export interface ForkHashTreeNodeDto {
  Fork: {
    left: HashTreeNodeDto;
    right: HashTreeNodeDto;
  };
}

export interface LabeledHashTreeNodeDto {
  Labeled: {
    label: string;
    child: HashTreeNodeDto;
  };
}

export interface LeafHashTreeNodeDto {
  Leaf: {
    content: string;
  };
}

export interface PrunedHashTreeNodeDto {
  Pruned: {
    content: string;
  };
}

export type HashTreeNodeDto =
  | EmptyHashTreeNodeDto
  | ForkHashTreeNodeDto
  | LabeledHashTreeNodeDto
  | LeafHashTreeNodeDto
  | PrunedHashTreeNodeDto;

export interface HashTreeDto {
  digest: string;
  root: HashTreeNodeDto;
}

export interface CertificateDto {
  tree: HashTreeDto;
  signature: string;
  delegation: DelegationDto | null;
}

export interface DelegationDto {
  subnet_id: number[];
  certificate: HashTreeDto;
}

export interface CanisterHttpResponseDto {
  response: {
    status_code: number;
    headers: [string, string][];
    body: string;
  };
  hash_tree: HashTreeDto | null;
  certificate: CertificateDto | null;
}

