import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DbService } from '../db.service';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.css']
})
export class BidSheetComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  bidId: string;
  bid: Promise<Object>|null = null;
  arrived: boolean = false;
  private resolve: Function|null = null;

  constructor(private db: DbService,
              private route: ActivatedRoute,
              private router: Router) { this.reset(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bidId = params['bidId'];
      this.db.getBidById(this.bidId)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(bid => {
          this.bid = bid;
          this.arrived = true;
        });
    });
  }

  reset() {
    this.arrived = false;
    this.bid = new Promise<Object>((resolve, reject) => { this.resolve = resolve; });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
