import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSheetComponent } from './bid-sheet.component';

describe('BidSheetComponent', () => {
  let component: BidSheetComponent;
  let fixture: ComponentFixture<BidSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
