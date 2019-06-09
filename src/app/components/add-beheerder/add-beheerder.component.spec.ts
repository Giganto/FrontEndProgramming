import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocentComponent } from './add-beheerder.component';

describe('AddDocentComponent', () => {
  let component: AddDocentComponent;
  let fixture: ComponentFixture<AddDocentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
