import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
              .subscribe(
                res => {
                  console.log(res);
                  localStorage.setItem('token', res.token);
                  // storing the response, token object at browser's localstorage
                  this._router.navigate(['/home']);
                },
                err => console.log(err),
              );
  }
}
