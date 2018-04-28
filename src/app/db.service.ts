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
    var updates = { totalPrice: totalPrice,
                    inputValues: inputs,
                    clientName: clientName,
                    subgallons: subgallons,
                    totalHours: totalHours,
                    totalGallons: totalGallons,
                    subhours: subhours,
                    subtotals: subtotals };

    this.bids.update(bidKey, updates);
    return bidKey;
  }

  getBids() {
    return this.bids;
  }

  getBidById(id: string) {
    return this.db.object('/bids/' + id);
  }

  getOthersSubtotal(bid: Object) {
    var othersSubtotal = 0;
    var subtotals = bid.subtotals;
    for (var sub in subtotals) {
      if (sub != 'paintSubtotal' && sub != 'wagesSubtotal') {
        othersSubtotal += subtotals[sub];
      }
    }
    return othersSubtotal.toFixed(2);
  }

}
