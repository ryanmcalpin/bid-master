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

  // GALLONS
  sidingPerGallon: number; // 300
  soffitsPerGallon: number; // 150
  fasciaPerGallon: number; // 100
  foundationPerGallon: number; // 300

  // HOURS
  sidingPerHour: number; // 100
  soffitsPerHour: number; // 10
  fasciaPerHour: number; // 20
  windowFramesPerHour: number; // 1
  foundationPerHour: number; // 300
  scrapingPerHour: number; // 10
  obstructionsPerHour: number // 3
  doorsPerHour: number // .6667
  doorFramesPerHour: number // 1
  pillarsPerHour: number // 2
  glazingPerHour: number // 5

  // MISC
  sidingRepairPerTenSF: number // 225
  pricePerTubeCaulk: number // 5
  pricePerRollPlastic: number // 15
  pricePerRollTape: number // 6

  // TOTALS
  pricePerGallonPaint: number // 37
  pricePerGallonPrimer: number // 25

  totalGallons: number = 0;
  totalHours: number = 0;

  averageWage: number = 15;
  adjustedWage: number = this.averageWage + 1.5;

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
    var sidingGallons = this.siding / this.sidingPerGallon;
    var soffitsGallons = this.soffits / this.soffitsPerGallon;
    var fasciaGallons = this.fascia / this.fasciaPerGallon;
    var foundationGallons = this.foundation / this.foundationPerGallon;
    subgallons = { sidingGallons: +sidingGallons.toFixed(2), soffitsGallons: +soffitsGallons.toFixed(2), fasciaGallons: +fasciaGallons.toFixed(2), foundationGallons: +foundationGallons.toFixed(2) };

    this.totalGallons = 0;
    for (var key in subgallons) {
      if (subgallons.hasOwnProperty(key)) {
        this.totalGallons += subgallons[key];
      }
    }

    var subhours = {};
    var sidingHours = this.siding / this.sidingPerHour;
    var soffitsHours = this.soffits / this.soffitsPerHour;
    var fasciaHours = this.fascia / this.fasciaPerHour;
    var windowsHours = this.windows;
    var windowFramesHours = this.windowFrames / this.windowFramesPerHour;
    var foundationHours = this.foundation / this.foundationPerHour;
    var scrapingHours = this.scraping / this.scrapingPerHour;
    var obstructionsHours = this.obstructions / this.obstructionsPerHour;
    var doorsHours = this.doors / this.doorsPerHour;
    var doorFramesHours = this.doorFrames / this.doorFramesPerHour;
    var pillarsHours = this.pillars / this.pillarsPerHour;
    var glazingHours = this.glazing / this.glazingPerHour;
    subhours = { sidingHours: +sidingHours.toFixed(2), soffitsHours: +soffitsHours.toFixed(2), fasciaHours: +fasciaHours.toFixed(2), windowsHours: +windowsHours.toFixed(2), windowFramesHours: +windowFramesHours.toFixed(2), foundationHours: +foundationHours.toFixed(2), scrapingHours: +scrapingHours.toFixed(2), obstructionsHours: +obstructionsHours.toFixed(2), doorsHours: +doorsHours.toFixed(2), doorFramesHours: +doorFramesHours.toFixed(2), pillarsHours: +pillarsHours.toFixed(2), glazingHours: +glazingHours.toFixed(2) };

    this.totalHours = 0;
    for (var key in subhours) {
      if (subhours.hasOwnProperty(key)) {
        this.totalHours += subhours[key];
      }
    }

    var subtotals = {};
    var sidingRepairSubtotal = this.sidingRepair / 10 * this.sidingRepairPerTenSF;
    var paintSubtotal = this.totalGallons * this.pricePerGallonPaint;
    var primerSubtotal = this.primer * this.pricePerGallonPrimer;
    var caulkSubtotal = this.caulk * this.pricePerTubeCaulk;
    var plasticSubtotal = this.plastic * this.pricePerRollPlastic;
    var tapeSubtotal = this.tape * this.pricePerRollTape;
    var wagesSubtotal = this.totalHours * this.adjustedWage;
    subtotals = { sidingRepairSubtotal: +sidingRepairSubtotal.toFixed(2), paintSubtotal: +paintSubtotal.toFixed(2), primerSubtotal: +primerSubtotal.toFixed(2), caulkSubtotal: +caulkSubtotal.toFixed(2), plasticSubtotal: +plasticSubtotal.toFixed(2), tapeSubtotal: +tapeSubtotal.toFixed(2), wagesSubtotal: +wagesSubtotal.toFixed(2) }

    var totalPrice = 0;
    for (var key in subtotals) {
      if (subtotals.hasOwnProperty(key)) {
        totalPrice += subtotals[key];
      }
    }

    var fbKey = this.db.createBid(+totalPrice.toFixed(2), +this.totalHours.toFixed(2), +this.totalGallons.toFixed(2), subtotals, subhours, subgallons, this.clientName, inputValues);

    this.router.navigate(['bids', fbKey]);
  }


}
