import { invoke } from "@tauri-apps/api/tauri";

export interface CanisterHttpRequestDto {
  gateway: string;
  canisterId: string;
  path: string;
}

export interface CanisterHttpResponseDto {
  response: {
    statusCode: number;
    headers: [string, string][];
    body: string;
  };
}

export async function canisterHttpRequest(
  request: CanisterHttpRequestDto
): Promise<CanisterHttpResponseDto> {
  return await invoke<CanisterHttpResponseDto>("canister_http_request", {
    ...request,
  });
}
