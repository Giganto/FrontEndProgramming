import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerzoekComponent } from './verzoek.component';

describe('VerzoekComponent', () => {
  let component: VerzoekComponent;
  let fixture: ComponentFixture<VerzoekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerzoekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerzoekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
