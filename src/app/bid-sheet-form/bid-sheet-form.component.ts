import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-bid-sheet-form',
  templateUrl: './bid-sheet-form.component.html',
  styleUrls: ['./bid-sheet-form.component.css']
})
export class BidSheetFormComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  title: string = 'Klabby Pro';
  user: any = null;
  rates: any = null;
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

  constructor(private fb: FormBuilder,
              private router: Router,
              private db: DbService,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe(user => {
        if (user) {
          this.db.getRates(user.uid).takeUntil(this.ngUnsubscribe).subscribe(rates => {
            this.rates = rates;
          })
        }
      })

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

    var inputValues = {
      siding: this.siding,
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
      additionalFlat: this.additionalFlat
    };


    var subgallons = {};
    var sidingGallons = this.siding / this.rates[16].$value;
    var soffitsGallons = this.soffits / this.rates[18].$value;
    var fasciaGallons = this.fascia / this.rates[2].$value;
    var foundationGallons = this.foundation / this.rates[4].$value;
    subgallons = { sidingGallons: +sidingGallons.toFixed(2), soffitsGallons: +soffitsGallons.toFixed(2), fasciaGallons: +fasciaGallons.toFixed(2), foundationGallons: +foundationGallons.toFixed(2) };

    this.totalGallons = 0;
    for (var key in subgallons) {
      if (subgallons.hasOwnProperty(key)) {
        this.totalGallons += subgallons[key];
      }
    }

    var subhours = {};
    var sidingHours = this.siding / this.rates[17].$value;
    var soffitsHours = this.soffits / this.rates[19].$value;
    var fasciaHours = this.fascia / this.rates[3].$value;
    var windowsHours = this.windows / this.rates[21].$value;
    var windowFramesHours = this.windowFrames / this.rates[20].$value;
    var foundationHours = this.foundation / this.rates[5].$value;
    var scrapingHours = this.scraping / this.rates[14].$value;
    var obstructionsHours = this.obstructions / this.rates[7].$value;
    var doorsHours = this.doors / this.rates[1].$value;
    var doorFramesHours = this.doorFrames / this.rates[0].$value;
    var pillarsHours = this.pillars / this.rates[8].$value;
    var glazingHours = this.glazing / this.rates[6].$value;
    subhours = { sidingHours: +sidingHours.toFixed(2), soffitsHours: +soffitsHours.toFixed(2), fasciaHours: +fasciaHours.toFixed(2), windowsHours: +windowsHours.toFixed(2), windowFramesHours: +windowFramesHours.toFixed(2), foundationHours: +foundationHours.toFixed(2), scrapingHours: +scrapingHours.toFixed(2), obstructionsHours: +obstructionsHours.toFixed(2), doorsHours: +doorsHours.toFixed(2), doorFramesHours: +doorFramesHours.toFixed(2), pillarsHours: +pillarsHours.toFixed(2), glazingHours: +glazingHours.toFixed(2) };

    this.totalHours = 0;
    for (var key in subhours) {
      if (subhours.hasOwnProperty(key)) {
        this.totalHours += subhours[key];
      }
    }

    var subtotals = {};
    var sidingRepairSubtotal = this.sidingRepair / 10 * this.rates[15].$value;
    var paintSubtotal = this.totalGallons * this.rates[9].$value;
    var primerSubtotal = this.primer * this.rates[10].$value;
    var caulkSubtotal = this.caulk * this.rates[13].$value;
    var plasticSubtotal = this.plastic * this.rates[11].$value;
    var tapeSubtotal = this.tape * this.rates[12].$value;
    var wagesSubtotal = this.totalHours * this.adjustedWage;
    subtotals = { sidingRepairSubtotal: +sidingRepairSubtotal.toFixed(2), paintSubtotal: +paintSubtotal.toFixed(2), primerSubtotal: +primerSubtotal.toFixed(2), caulkSubtotal: +caulkSubtotal.toFixed(2), plasticSubtotal: +plasticSubtotal.toFixed(2), tapeSubtotal: +tapeSubtotal.toFixed(2), wagesSubtotal: +wagesSubtotal.toFixed(2) }

    var totalPrice = 0;
    for (var key in subtotals) {
      if (subtotals.hasOwnProperty(key)) {
        totalPrice += subtotals[key];
      }
    }

    console.log(this.rates)
    console.log(this.rates[0])
    console.log(this.rates[0].$key)
    console.log(this.rates[0].$value)

    var fbKey = this.db.createBid(+totalPrice.toFixed(2), +this.totalHours.toFixed(2), +this.totalGallons.toFixed(2), subtotals, subhours, subgallons, this.clientName, inputValues);

    this.router.navigate(['bids', fbKey]);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
