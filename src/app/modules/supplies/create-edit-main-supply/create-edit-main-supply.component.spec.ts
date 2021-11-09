import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMainSupplyComponent } from './create-edit-main-supply.component';

describe('CreateEditMainSupplyComponent', () => {
  let component: CreateEditMainSupplyComponent;
  let fixture: ComponentFixture<CreateEditMainSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMainSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditMainSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
