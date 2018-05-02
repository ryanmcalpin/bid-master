import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import * as firebase 'firebase/app';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routeSections;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any = null;

  constructor(private router: Router, private auth: AuthService, private db: DbService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.routeSections = event['url'].split('/').filter(route => (route));
    });

    this.auth.getCurrentUser()
    .takeUntil(this.ngUnsubscribe).subscribe(user=>{
      this.user = user;
      // if (this.user) {
      //   this.db.getUserById(this.user.uid)
      //   .takeUntil(this.ngUnsubscribe).subscribe(dbuser=>{
      //     this.userObjFromDb = dbuser;
      //   });
      //   this.db.getTeamsAssociatedWithUser(this.user.uid)
      //   .takeUntil(this.ngUnsubscribe).subscribe(teams=>{
      //     this.teams = teams;
      //   });
      // }
    });
  }

  ngOnDestroy(){
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

  logoClick() {
    this.auth.loginGoogle();
  }
}
