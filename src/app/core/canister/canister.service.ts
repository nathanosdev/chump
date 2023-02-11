import { Injectable } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";

export interface CanisterHttpRequestDto {
  response: {
    statusCode: number;
    headers: [string, string][];
    body: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class CanisterService {
  public async canisterHttpRequest(): Promise<CanisterHttpRequestDto> {
    return await invoke<CanisterHttpRequestDto>("canister_http_request", {
      gateway: "https://ic0.app",
      canisterId: "qoctq-giaaa-aaaaa-aaaea-cai",
      path: "/",
    });
  }
}
