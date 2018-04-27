import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DbService {
  bids: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.bids = db.list('/bids');
  }

  createBid(clientName, inputs, totalPrice) {
    var bidKey = this.bids.push(totalPrice).key;
    var updates = { total: totalPrice, inputValues: inputs, clientName: clientName };
    this.bids.update(bidKey, updates);
  }

}
