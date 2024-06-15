import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresModalComponent } from './profesores-modal.component';

describe('ProfesoresModalComponent', () => {
  let component: ProfesoresModalComponent;
  let fixture: ComponentFixture<ProfesoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesoresModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
