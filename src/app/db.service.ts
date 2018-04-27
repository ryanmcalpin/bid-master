import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DbService {
  bids: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.bids = db.list('/bids');
  }

  createBid(totalPrice, totalHours, totalGallons, subtotals, subhours, subgallons, clientName, inputs) {
    var bidKey = this.bids.push(totalPrice).key;
    var updates = { totalPrice: totalPrice, inputValues: inputs, clientName: clientName, subgallons: subgallons, totalHours: totalHours, totalGallons: totalGallons, subhours: subhours, subtotals: subtotals };
    this.bids.update(bidKey, updates);

    return bidKey;
  }

}
