import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-form-input",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-input.component.html",
  styleUrls: ["./form-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormInputComponent,
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  public value: string = "";

  private onFormControlChanged?: (value: string) => {};
  private onFormControlTouched?: () => {};

  public isTouched = false;
  public isDisabled = false;

  @HostBinding("attr.id")
  public id?: string;

  constructor(@Attribute("id") id: string) {
    this.id = id;
  }

  public onChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.onFormControlChanged?.(event.target.value);
    }
  }

  public onBlur(): void {
    this.onFormControlTouched?.();
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(onChange: (value: string) => {}): void {
    this.onFormControlChanged = onChange;
  }

  public registerOnTouched(onTouched: () => {}): void {
    this.onFormControlTouched = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
