import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSheetFormComponent } from './bid-sheet-form.component';

describe('BidSheetFormComponent', () => {
  let component: BidSheetFormComponent;
  let fixture: ComponentFixture<BidSheetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidSheetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
