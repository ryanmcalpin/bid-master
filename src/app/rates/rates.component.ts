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
    console.log('forrm')
  }

}
