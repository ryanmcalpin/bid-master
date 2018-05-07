import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';

@Injectable()
export class DbService {
  bids: FirebaseListObservable<any>;
  rates: FirebaseListObservable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.getCurrentUser()
    .takeUntil(this.ngUnsubscribe).subscribe(user=>{
      this.user = user;
      if (this.user) {
        this.bids = db.list('/users/' + user.uid + '/bids');
        this.rates = db.list('users/' + user.uid + '/rates');
      }
    });
  }

  createBid(totalPrice, totalHours, totalGallons, subtotals, subhours, subgallons, clientName, inputs) {
    var bidKey = this.bids.push(totalPrice).key;
    var timestamp = this.getTimestamp();
    var dateTime = this.convertTimestamp(timestamp);
    var updates = { totalPrice: totalPrice,
                    inputValues: inputs,
                    clientName: clientName,
                    subgallons: subgallons,
                    totalHours: totalHours,
                    totalGallons: totalGallons,
                    subhours: subhours,
                    subtotals: subtotals,
                    timestamp: timestamp,
                    dateTime: dateTime};

    this.bids.update(bidKey, updates);
    return bidKey;
  }

  getBids() {
    return this.bids;
  }

  getBidById(id: string) {
    return this.db.object('/users/' + this.user.uid + '/bids/' + id);
  }

  getOthersSubtotal(bid: Object) {
    var othersSubtotal = 0;
    var subtotals = bid['subtotals'];
    for (var sub in subtotals) {
      if (sub != 'paintSubtotal' && sub != 'wagesSubtotal') {
        othersSubtotal += subtotals[sub];
      }
    }
    return othersSubtotal.toFixed(2);
  }

  getTimestamp() {
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }
    return Date.now();
  }

  convertTimestamp(timestamp: number) {
    var ts = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = ts.getFullYear();
    var month = months[ts.getMonth()];
    var date = ts.getDate();
    var hour = ts.getHours();
    var min = ts.getMinutes();

    var ampm = 'am';
    if (hour > 12) {
      hour -= 12;
      ampm = 'pm';
    }

    var formattedDate = month + ' ' + date + ', ' + year + ', ' + hour + ':' + min + ampm;
    return formattedDate;
  }

  getUserObjectById(uid) {
    return this.db.object('/users/' + uid);
  }

  getRates(uid) {
    return this.db.list('/users/' + uid + '/rates');
  }

}
