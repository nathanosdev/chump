import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  canisterHttpRequest,
  LayoutComponent,
  CanisterHttpRequestFormComponent,
  CanisterHttpRequestDto,
} from "./core";

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
  ],
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public canisterHttpRequestDto: CanisterHttpRequestDto = {
    gateway: DEFAULT_GATEWAY,
    canisterId: DEFAULT_CANISTER_ID,
    path: DEFAULT_PATH,
  };

  public ngOnInit(): void {
    if (this.canisterHttpRequestDto) {
      canisterHttpRequest(this.canisterHttpRequestDto).then((result) => {
        console.log("Canister request complete", result);
      });
    }
  }
}
