import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShooperComponent } from './shooper.component';

describe('ShooperComponent', () => {
  let component: ShooperComponent;
  let fixture: ComponentFixture<ShooperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShooperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShooperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
