import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTreeNodeComponent } from './hash-tree-node.component';

describe('HashTreeNodeComponent', () => {
  let component: HashTreeNodeComponent;
  let fixture: ComponentFixture<HashTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HashTreeNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HashTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
