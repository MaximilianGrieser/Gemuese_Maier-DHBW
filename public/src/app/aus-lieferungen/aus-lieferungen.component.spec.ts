import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AusLieferungenComponent} from './aus-lieferungen.component';

describe('AusLieferungenComponent', () => {
  let component: AusLieferungenComponent;
  let fixture: ComponentFixture<AusLieferungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AusLieferungenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusLieferungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
