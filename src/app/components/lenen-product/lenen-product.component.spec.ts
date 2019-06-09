import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenenProductComponent } from './lenen-product.component';

describe('LenenProductComponent', () => {
  let component: LenenProductComponent;
  let fixture: ComponentFixture<LenenProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenenProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenenProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
