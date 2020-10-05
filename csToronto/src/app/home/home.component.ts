import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CommunityCouncilAreaList = ['Downtown and East York', 'North York', 'Etobicoke York', 'Scarborough', 'Toronto'];
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
}
