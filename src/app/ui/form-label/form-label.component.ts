import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-form-label",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-label.component.html",
  styleUrls: ["./form-label.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLabelComponent {
  @HostBinding("attr.for")
  public for?: string;

  constructor(@Attribute("for") forAttr: string) {
    this.for = forAttr;
  }
}
