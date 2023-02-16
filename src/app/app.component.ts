import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  canisterHttpRequest,
  LayoutComponent,
  CanisterHttpRequestFormComponent,
  CanisterHttpRequestDto,
  CanisterHttpResponse,
} from "./core";
import { HashTreeNodeComponent } from "./core/hash-tree-node";
import { ButtonComponent } from "./ui";

export const DEFAULT_GATEWAY = "https://ic0.app";
export const DEFAULT_CANISTER_ID = "qoctq-giaaa-aaaaa-aaaea-cai";
export const DEFAULT_PATH = "/";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutComponent,
    CanisterHttpRequestFormComponent,
    ButtonComponent,
    HashTreeNodeComponent,
  ],
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public canisterHttpRequestDto: CanisterHttpRequestDto = {
    gateway: DEFAULT_GATEWAY,
    canisterId: DEFAULT_CANISTER_ID,
    path: DEFAULT_PATH,
  };

  public canisterHttpResponse?: CanisterHttpResponse;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public onSubmitCanisterHttpRequest(): void {
    if (this.canisterHttpRequestDto) {
      canisterHttpRequest(this.canisterHttpRequestDto).then((result) => {
        this.canisterHttpResponse = result;
        this.changeDetectorRef.markForCheck();
      });
    }
  }
}
