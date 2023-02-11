import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { takeUntil, tap } from "rxjs/operators";
import { CanisterHttpRequestDto } from "../canister-http-request/canister-http-request";
import { FormInputComponent, FormLabelComponent } from "../../ui";
import { Subject } from "rxjs";

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
export class CanisterHttpRequestFormComponent implements OnDestroy {
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

  private destroy$: Subject<void>;

  constructor() {
    const formBuilder = new FormBuilder();

    this.formGroup = formBuilder.nonNullable.group<CanisterHttpRequestDto>({
      gateway: "",
      canisterId: "",
      path: "",
    });

    this.destroy$ = new Subject();

    this.formGroup.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          console.log("Form value changed", this.formGroup.getRawValue());

          this.canisterHttpRequestChange.emit(this.formGroup.getRawValue());
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
