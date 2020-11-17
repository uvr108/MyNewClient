import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdencompraComponent } from './ordencompra.component';

describe('OrdencompraComponent', () => {
  let component: OrdencompraComponent;
  let fixture: ComponentFixture<OrdencompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdencompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
