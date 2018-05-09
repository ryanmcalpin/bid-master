import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {
  user: any = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  rates: FirebaseListObservable<any>;
  form: FormGroup;

  constructor(public db: DbService,
              private auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.auth.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe(user => {
      if (user) {
        this.db.getUserObjectById(user.uid).takeUntil(this.ngUnsubscribe).subscribe(userObj => {
          this.user = userObj;
        })
        this.db.getRates(user.uid).takeUntil(this.ngUnsubscribe).subscribe(rates => {
          this.rates = rates;
          this.form = this.fb.group({
            doorFramesPerHour: [rates[0].$value, Validators.required],
          })
          for (let i = 1; i < rates.length; i++) {
            let newControl = new FormControl(['', Validators.required]);
            newControl.setValue(rates[i].$value);
            this.form.addControl(rates[i].$key, newControl);
          }
        })
      }
    })

  }

  saveRates() {
    var rates = {
      doorFramesPerHour: this.form.value.doorFramesPerHour,
      doorsPerHour: this.form.value.doorsPerHour,
      fasciaLFPerGallon: this.form.value.fasciaLFPerGallon,
      fasciaLFPerHour: this.form.value.fasciaLFPerHour,
      foundationSFPerGallon: this.form.value.foundationSFPerGallon,
      foundationSFPerHour: this.form.value.foundationSFPerHour,
      glazingLFPerHour: this.form.value.glazingLFPerHour,
      obstructionsPerHour: this.form.value.obstructionsPerHour,
      pillarsPerHour: this.form.value.pillarsPerHour,
      pricePerGallonPaint: this.form.value.pricePerGallonPaint,
      pricePerGallonPrimer: this.form.value.pricePerGallonPrimer,
      pricePerRollPlastic: this.form.value.pricePerRollPlastic,
      pricePerRollTape: this.form.value.pricePerRollTape,
      pricePerTubeCaulk: this.form.value.pricePerTubeCaulk,
      scrapingSFPerHour: this.form.value.scrapingSFPerHour,
      sidingRepairPerTenSF: this.form.value.sidingRepairPerTenSF,
      sidingSFPerGallon: this.form.value.sidingSFPerGallon,
      sidingSFPerHour: this.form.value.sidingSFPerHour,
      soffitSFPerGallon: this.form.value.soffitSFPerGallon,
      soffitSFPerHour: this.form.value.soffitSFPerHour,
      windowFramesPerHour: this.form.value.windowFramesPerHour,
      windowsPerHour: this.form.value.windowsPerHour
    }

    this.db.updateRates(rates);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
