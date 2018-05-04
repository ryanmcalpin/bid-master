import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.auth.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(user => {
        user ? console.log('yee') : console.log('neee'); 
    });
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    var email = this.form.value.email;
    var password = this.form.value.password;
    this.auth.login(email, password);
    this.router.navigate(['/']);
  }

}
