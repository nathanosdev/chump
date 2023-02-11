import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanisterHttpRequestFormComponent } from './canister-http-request-form.component';

describe('CanisterHttpRequestFormComponent', () => {
  let component: CanisterHttpRequestFormComponent;
  let fixture: ComponentFixture<CanisterHttpRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanisterHttpRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanisterHttpRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
