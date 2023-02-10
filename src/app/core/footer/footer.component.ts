import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "../../ui";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
