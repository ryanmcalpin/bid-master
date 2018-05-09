import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './user.model';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe(user=>{
      if(user){
        var ref = firebase.database().ref('/users');
        ref.once('value', (snapshot)=>{
          if(!snapshot.hasChild(user.uid)){
            let newUser = new User(user.displayName, user.email, (new Date).toJSON());
            ref.child(user.uid).set(newUser);
          }
        })
      }
    });
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      // handle errors
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser(){
    return this.user;
  }
}
