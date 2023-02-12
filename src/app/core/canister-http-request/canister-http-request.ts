import { invoke } from "@tauri-apps/api/tauri";

export interface CanisterHttpRequestDto {
  gateway: string;
  canisterId: string;
  path: string;
}

export interface CanisterHttpResponseDto {
  response: {
    status_code: number;
    headers: [string, string][];
    body: string;
  };
  hash_tree: HashTree | null;
  certificate: Certificate | null;
}

export type HashTreeNode =
  | {
      Empty: {};
    }
  | {
      Fork: {
        left: HashTreeNode;
        right: HashTreeNode;
      };
    }
  | {
      Labeled: {
        label: string;
        child: HashTreeNode;
      };
    }
  | {
      Leaf: {
        content: string;
      };
    }
  | {
      Pruned: {
        content: string;
      };
    };

export interface HashTree {
  digest: string;
  root: HashTreeNode;
}

export interface Certificate {
  tree: HashTree;
  signature: string;
  delegation: Delegation | null;
}

export interface Delegation {
  subnet_id: number[];
  certificate: HashTree;
}

export async function canisterHttpRequest(
  request: CanisterHttpRequestDto
): Promise<CanisterHttpResponseDto> {
  return await invoke<CanisterHttpResponseDto>("canister_http_request", {
    ...request,
  });
}
