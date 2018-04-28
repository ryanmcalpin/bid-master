import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../db.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  bids: FirebaseListObservable<any>;

  constructor(public db: DbService) { }

  ngOnInit() {
    this.db.getBids()
      .takeUntil(this.ngUnsubscribe).subscribe(data => {
        this.bids = data;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
