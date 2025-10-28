import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttempHeaderComponent } from './attemp-header.component';

describe('AttempHeaderComponent', () => {
  let component: AttempHeaderComponent;
  let fixture: ComponentFixture<AttempHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttempHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttempHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
