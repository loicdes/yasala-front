import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeProductComponent } from './propose-product.component';

describe('ProposeProductComponent', () => {
  let component: ProposeProductComponent;
  let fixture: ComponentFixture<ProposeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
