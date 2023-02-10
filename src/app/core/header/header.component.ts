import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../ui";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
