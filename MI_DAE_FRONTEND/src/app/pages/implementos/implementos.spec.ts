import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Implementos } from './implementos.component';

describe('Implementos', () => {
  let component: Implementos;
  let fixture: ComponentFixture<Implementos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Implementos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Implementos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
