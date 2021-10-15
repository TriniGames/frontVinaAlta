import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamajuanasComponent } from './damajuanas.component';

describe('DamajuanasComponent', () => {
  let component: DamajuanasComponent;
  let fixture: ComponentFixture<DamajuanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamajuanasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamajuanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
