import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenenComponent } from './lenen.component';

describe('LenenComponent', () => {
  let component: LenenComponent;
  let fixture: ComponentFixture<LenenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
