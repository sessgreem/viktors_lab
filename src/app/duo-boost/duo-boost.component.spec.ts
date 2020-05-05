import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuoBoostComponent } from './duo-boost.component';

describe('DuoBoostComponent', () => {
  let component: DuoBoostComponent;
  let fixture: ComponentFixture<DuoBoostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuoBoostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuoBoostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
