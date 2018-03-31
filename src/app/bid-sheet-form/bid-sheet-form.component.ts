import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bid-sheet-form',
  templateUrl: './bid-sheet-form.component.html',
  styleUrls: ['./bid-sheet-form.component.css']
})
export class BidSheetFormComponent implements OnInit {

  title: String = 'KlabbyPro';
  form: FormGroup;

  siding: number;
  soffits: number;
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
  sidingRepair: number;
  primer: number;
  caulk: number;
  plastic: number;
  tape: number;
  additionalHours: number;
  additionalFlat: number;

  totalGallons: number = 0;
  totalHours: number = 0;

  averageWage: number = 15;
  adjustedWage: number = this.averageWage + 1.5;

  totalPrice: number = 0;

  constructor(private fb: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      siding: ['', Validators.required],
      soffits: ['', Validators.required],
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
      sidingRepair: ['', Validators.required],
      primer: ['', Validators.required],
      caulk: ['', Validators.required],
      plastic: ['', Validators.required],
      tape: ['', Validators.required],
      additionalHours: ['', Validators.required],
      additionalFlat: ['', Validators.required],
    })
  }

  calculateBid() {
    console.log(this.form.value.soffits);

    this.siding = this.form.value.siding;
    this.soffits = this.form.value.soffits;
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
    this.sidingRepair = this.form.value.sidingRepair;
    this.primer = this.form.value.primer;
    this.caulk = this.form.value.caulk;
    this.plastic = this.form.value.plastic;
    this.tape = this.form.value.tape;
    this.additionalHours = this.form.value.additionalHours;
    this.additionalFlat = this.form.value.additionalFlat;

    this.totalGallons = 0;
    this.totalGallons += this.siding / 300;
    this.totalGallons += this.soffits / 150;
    this.totalGallons += this.fascia / 100;
    this.totalGallons += this.foundation / 300;

    this.totalHours = 0;
    this.totalHours += this.siding / 100;
    this.totalHours += this.soffits / 10;
    this.totalHours += this.fascia / 20;
    this.totalHours += this.windows;
    this.totalHours += this.windowFrames + this.doorFrames;
    this.totalHours += this.foundation / 300;
    this.totalHours += this.scraping / 10;
    this.totalHours += this.obstructions / 3;
    this.totalHours += this.doors * 1.5;
    this.totalHours += this.pillars / 2;
    this.totalHours += this.glazing / 5;
    this.totalHours += this.pressure + this.vegetation + this.additionalHours;


    this.totalPrice = 0;
    this.totalPrice += this.sidingRepair / 10 * 225;
    this.totalPrice += this.totalGallons * 37;
    this.totalPrice += this.primer * 25;
    this.totalPrice += this.caulk * 5;
    this.totalPrice += this.plastic * 15;
    this.totalPrice += this.tape * 6;
    this.totalPrice += this.totalHours * this.adjustedWage;

    console.log(this.totalPrice);

    this.router.navigate(['bid']);
  }


}
