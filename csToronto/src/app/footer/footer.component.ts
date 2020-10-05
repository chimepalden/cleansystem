import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscriber } from '../models/subscriber';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  subscriber: Subscriber = { email: null };

  constructor( private _authService: AuthService,
                private _router: Router) { }

  ngOnInit() {
  }

  subscribeUser(subscriberForm: NgForm) {
    this._authService.subscribeUser(this.subscriber)
                    .subscribe(res => {
                      console.log(res);
                      subscriberForm.reset();
                      // this._router.navigate(['/home']);
                      window.alert('Thank you for subscribing!');
                    },
                    err => {
                      console.log(err);
                    });
  }
}
