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
  testValue: String;

  constructor(public db: DbService) { }

  ngOnInit() {
    this.db.getTestData()
      .takeUntil(this.ngUnsubscribe).subscribe(data => {
        this.testValue = data.$value;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
