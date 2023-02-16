import { invoke } from "@tauri-apps/api/tauri";
import {
  CanisterHttpResponseDto,
  CertificateDto,
  DelegationDto,
} from "./canister-http-response-dto.types";
import {
  CanisterHttpResponse,
  Certificate,
  Delegation,
} from "./canister-http-response.types";
import { mapHashTree } from "./canister-http-response.utils";

export interface CanisterHttpRequestDto {
  gateway: string;
  canisterId: string;
  path: string;
}

function mapDelegation(
  delegation: DelegationDto | null
): Delegation | undefined {
  if (!delegation) {
    return;
  }

  const certificate = mapHashTree(delegation.certificate);

  if (!certificate) {
    // shouldn't happen
    return;
  }

  return {
    certificate,
    subnetId: delegation.subnet_id,
  };
}

function mapCertificate(
  certificate: CertificateDto | null
): Certificate | undefined {
  if (!certificate) {
    return;
  }

  const tree = mapHashTree(certificate.tree);
  if (!tree) {
    // shouldn't happen
    return;
  }

  return {
    signature: certificate.signature,
    tree,
    delegation: mapDelegation(certificate.delegation),
  };
}

function mapResponse(
  responseDto: CanisterHttpResponseDto
): CanisterHttpResponse {
  return {
    response: {
      ...responseDto.response,
      statusCode: responseDto.response.status_code,
    },
    hashTree: mapHashTree(responseDto.hash_tree),
    certificate: mapCertificate(responseDto.certificate),
  };
}

export async function canisterHttpRequest(
  request: CanisterHttpRequestDto
): Promise<CanisterHttpResponse> {
  const response = await invoke<CanisterHttpResponseDto>(
    "canister_http_request",
    {
      ...request,
    }
  );

  return mapResponse(response);
}
