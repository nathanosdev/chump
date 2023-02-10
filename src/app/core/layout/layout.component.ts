import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header";
import { FooterComponent } from "../footer";
import { ContainerComponent } from "../../ui";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ContainerComponent],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
