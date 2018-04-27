import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-bid-sheet-form',
  templateUrl: './bid-sheet-form.component.html',
  styleUrls: ['./bid-sheet-form.component.css']
})
export class BidSheetFormComponent implements OnInit {

  title: string = 'KlabbyPro';
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
  clientName: string;

  totalGallons: number = 0;
  totalHours: number = 0;

  averageWage: number = 15;
  adjustedWage: number = this.averageWage + 1.5;

  totalPrice: number = 0;

  constructor(private fb: FormBuilder,
              private router: Router,
              private db: DbService) {

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
      clientName: ['', Validators.required],
    })
  }

  calculateBid() {
    // should be validated
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
    this.clientName = this.form.value.clientName;

    var inputValues = { siding: this.siding,
                        soffits: this.soffits,
                        fascia: this.fascia,
                        glazing: this.glazing,
                        foundation: this.foundation,
                        scraping: this.scraping,
                        windows: this.windows,
                        windowFrames: this.windowFrames,
                        doors: this.doors,
                        doorFrames: this.doorFrames,
                        obstructions: this.obstructions,
                        pillars: this.pillars,
                        pressure: this.pressure,
                        vegetation: this.vegetation,
                        sidingRepair: this.sidingRepair,
                        primer: this.primer,
                        caulk: this.caulk,
                        plastic: this.plastic,
                        tape: this.tape,
                        additionalHours: this.additionalHours,
                        additionalFlat: this.additionalFlat};

    var subgallons = {};
    var sidingGallons = this.siding / 300;
    var soffitsGallons = this.soffits / 150
    var fasciaGallons = this.fascia / 100;
    var foundationGallons = this.foundation / 300;
    subgallons = { sidingGallons: +sidingGallons.toFixed(2), soffitsGallons: +soffitsGallons.toFixed(2), fasciaGallons: +fasciaGallons.toFixed(2), foundationGallons: +foundationGallons.toFixed(2) };

    this.totalGallons = 0;
    for (var key in subgallons) {
      if (subgallons.hasOwnProperty(key)) {
        this.totalGallons += subgallons[key];
      }
    }

    var subhours = {};
    var sidingHours = this.siding / 100;
    var soffitsHours = this.soffits / 10;
    var fasciaHours = this.fascia / 20;
    var windowsHours = this.windows;
    var windowFramesHours = this.windowFrames;
    var foundationHours = this.foundation / 300;
    var scrapingHours = this.scraping / 10;
    var obstructionsHours = this.obstructions / 3;
    var doorsHours = this.doors * 1.5;
    var doorFramesHours = this.doorFrames;
    var pillarsHours = this.pillars / 2;
    var glazingHours = this.glazing / 5;
    subhours = { sidingHours: +sidingHours.toFixed(2), soffitsHours: +soffitsHours.toFixed(2), fasciaHours: +fasciaHours.toFixed(2), windowsHours: +windowsHours.toFixed(2), windowFramesHours: +windowFramesHours.toFixed(2), foundationHours: +foundationHours.toFixed(2), scrapingHours: +scrapingHours.toFixed(2), obstructionsHours: +obstructionsHours.toFixed(2), doorsHours: +doorsHours.toFixed(2), doorFramesHours: +doorFramesHours.toFixed(2), pillarsHours: +pillarsHours.toFixed(2), glazingHours: +glazingHours.toFixed(2) };

    this.totalHours = 0;
    for (var key in subhours) {
      if (subhours.hasOwnProperty(key)) {
        this.totalHours += subhours[key];
      }
    }

    // numbers need to be converted to variables for easy editing
    this.totalPrice = 0;
    this.totalPrice += this.sidingRepair / 10 * 225;
    this.totalPrice += this.totalGallons * 37;
    this.totalPrice += this.primer * 25;
    this.totalPrice += this.caulk * 5;
    this.totalPrice += this.plastic * 15;
    this.totalPrice += this.tape * 6;
    this.totalPrice += this.totalHours * this.adjustedWage;

    this.db.createBid(this.totalHours, this.totalGallons, subhours, subgallons, this.clientName, inputValues, this.totalPrice.toFixed(2));

    this.router.navigate(['bid']);
  }


}
