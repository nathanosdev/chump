import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { CanisterHttpRequestDto } from "../canister-http-request/canister-http-request";
import { FormInputComponent, FormLabelComponent } from "../../ui";

export interface CanisterHttpRequestForm {
  gateway: FormControl<string>;
  canisterId: FormControl<string>;
  path: FormControl<string>;
}

@Component({
  selector: "app-canister-http-request-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormLabelComponent,
  ],
  templateUrl: "./canister-http-request-form.component.html",
  styleUrls: ["./canister-http-request-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanisterHttpRequestFormComponent {
  @Input()
  public set canisterHttpRequest(canisterHttpRequest: CanisterHttpRequestDto) {
    this.formGroup.setValue(canisterHttpRequest);
  }

  public get canisterHttpRequest(): CanisterHttpRequestDto {
    return this.formGroup.getRawValue();
  }

  @Output()
  public canisterHttpRequestChange = new EventEmitter<CanisterHttpRequestDto>();

  public formGroup: FormGroup<CanisterHttpRequestForm>;

  constructor() {
    const formBuilder = new FormBuilder();

    this.formGroup = formBuilder.nonNullable.group<CanisterHttpRequestDto>({
      gateway: "",
      canisterId: "",
      path: "",
    });
  }
}
