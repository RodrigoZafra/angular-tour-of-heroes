import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaggesComponent } from './mesagges.component';

describe('MesaggesComponent', () => {
  let component: MesaggesComponent;
  let fixture: ComponentFixture<MesaggesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaggesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaggesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
