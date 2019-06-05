import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVerzoekComponent } from './single-verzoek.component';

describe('SingleVerzoekComponent', () => {
  let component: SingleVerzoekComponent;
  let fixture: ComponentFixture<SingleVerzoekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVerzoekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVerzoekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
