import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPingPong } from './reserva-ping-pong.component';

describe('ReservaPingPong', () => {
  let component: ReservaPingPong;
  let fixture: ComponentFixture<ReservaPingPong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaPingPong]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaPingPong);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
