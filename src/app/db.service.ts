import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DbService {
  bids: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.bids = db.list('/bids');
  }

  createBid(hours, gallons, subhours, subgallons, clientName, inputs, totalPrice) {
    var bidKey = this.bids.push(totalPrice).key;
    var updates = { totalPrice: totalPrice, inputValues: inputs, clientName: clientName, subgallons: subgallons, totalHours: hours, totalGallons: gallons, subhours: subhours };
    this.bids.update(bidKey, updates);
  }

}
