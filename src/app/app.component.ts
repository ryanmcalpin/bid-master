import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DbService } from './db.service';
import { emails } from './permitted-users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routeSections;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any = null;
  userAllowed: boolean = false;

  constructor(private router: Router, private auth: AuthService, private db: DbService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.routeSections = event['url'].split('/').filter(route => (route));
    });

    this.auth.getCurrentUser()
    .takeUntil(this.ngUnsubscribe).subscribe(user=>{
      this.user = user;
      if (this.user) {
        emails.forEach(email => { this.user.email == email ? this.userAllowed = true : null; });
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logoClick() {
    if (this.user) {
      this.router.navigate(['/']);
    } else {
      this.auth.loginGoogle();
    }
  }
}
