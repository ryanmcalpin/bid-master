import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DbService {

  constructor(private db: AngularFireDatabase) {}

  getTestData() {
    return this.db.object('test');
  }

}
