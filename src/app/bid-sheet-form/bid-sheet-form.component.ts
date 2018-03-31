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

  siding: number;
  soffit: number;
  fascia: number;
  glazing: number;
  foundation: number;
  scraping: number;
  windows: number;
  windowFrames: number;
  doors: number;
  doorFrames: number;
  obstructions: number;
  pillars: number;
  pressure: number;
  vegetation: number;
  additionalHrs: number;
  additionalFlat: number;

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
    console.log(this.form.value.soffit);

    this.siding = this.form.value.siding;
    this.soffit = this.form.value.soffit;
    this.fascia = this.form.value.fascia;
    this.glazing = this.form.value.glazing;
    this.foundation = this.form.value.foundation;
    this.scraping = this.form.value.scraping;
    this.windows = this.form.value.windows;
    this.windowFrames = this.form.value.windowFrames;
    this.doors = this.form.value.doors;
    this.doorFrames = this.form.value.doorFrames;
    this.obstructions = this.form.value.obstructions;
    this.pillars = this.form.value.pillars;
    this.pressure = this.form.value.pressure;
    this.vegetation = this.form.value.vegetation;
    this.additionalHrs = this.form.value.additionalHrs;
    this.additionalFlat = this.form.value.additionalFlat;
  }


}
