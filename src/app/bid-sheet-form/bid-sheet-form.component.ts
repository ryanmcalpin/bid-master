import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bid-sheet-form',
  templateUrl: './bid-sheet-form.component.html',
  styleUrls: ['./bid-sheet-form.component.css']
})
export class BidSheetFormComponent implements OnInit {

  title: String = 'KlabbyPro';
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      siding: ['', Validators.required],
      soffit: ['', Validators.required],
      fascia: ['', Validators.required],
      glazing: ['', Validators.required],
      foundation: ['', Validators.required],
      scraping: ['', Validators.required],
      windows: ['', Validators.required],
      windowFrames: ['', Validators.required],
      doors: ['', Validators.required],
      doorFrames: ['', Validators.required],
      obstructions: ['', Validators.required],
      pillars: ['', Validators.required],
      pressure: ['', Validators.required],
      vegetation: ['', Validators.required],
      additionalHrs: ['', Validators.required],
      additionalFlat: ['', Validators.required]
    })
  }

  calculateBid() {
    console.log(this.form.value.soffit)
  }


}
