import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFiltradasComponent } from './ventas-filtradas.component';

describe('VentasFiltradasComponent', () => {
  let component: VentasFiltradasComponent;
  let fixture: ComponentFixture<VentasFiltradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentasFiltradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasFiltradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
