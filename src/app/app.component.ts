import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CanisterService, LayoutComponent } from "./core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private readonly canisterService: CanisterService) {}

  public ngOnInit(): void {
    this.canisterService.canisterHttpRequest().then((result) => {
      console.log("Canister request complete", result);
    });
  }
}
