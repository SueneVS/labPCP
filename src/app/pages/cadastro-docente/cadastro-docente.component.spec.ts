import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDocenteComponent } from './cadastro-docente.component';

describe('CadastroDocenteComponent', () => {
  let component: CadastroDocenteComponent;
  let fixture: ComponentFixture<CadastroDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
