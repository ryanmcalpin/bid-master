import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { FirebaseListObservable } from 'angularfire2/database';
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

  constructor(public db: DbService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe(user => {
        if (user) {
          this.db.getUserObjectById(user.uid).takeUntil(this.ngUnsubscribe).subscribe(userObj => {
            this.user = userObj;
          })
          this.db.getRates(user.uid).takeUntil(this.ngUnsubscribe).subscribe(rates => {
              this.rates = rates;
            })
        }
      })
  }

}
