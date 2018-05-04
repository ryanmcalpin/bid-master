import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  bids: FirebaseListObservable<any>;

  constructor(public db: DbService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(user => {
        this.db.getUserObjectById(user.uid)
          .takeUntil(this.ngUnsubscribe).subscribe(userObj => {
            this.user = userObj;
            console.log(this.user)
          })
        this.db.getBids()
        .takeUntil(this.ngUnsubscribe).subscribe(data => {
          this.bids = data;
        })
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
