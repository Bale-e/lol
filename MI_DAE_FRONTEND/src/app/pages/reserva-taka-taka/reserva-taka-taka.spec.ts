import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTakaTaka } from './reserva-taka-taka.component';

describe('ReservaTakaTaka', () => {
  let component: ReservaTakaTaka;
  let fixture: ComponentFixture<ReservaTakaTaka>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaTakaTaka]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaTakaTaka);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
