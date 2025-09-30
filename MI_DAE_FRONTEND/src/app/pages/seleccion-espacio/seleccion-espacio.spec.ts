import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEspacio } from './seleccion-espacio';

describe('SeleccionEspacio', () => {
  let component: SeleccionEspacio;
  let fixture: ComponentFixture<SeleccionEspacio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionEspacio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEspacio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
