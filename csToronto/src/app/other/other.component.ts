import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  membersList: any;
  membersListSize: any;
  staffsList: any;
  staffsListSize: any;

  constructor(private _authService: AuthService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const Id = +params.get('id');
      if (Id && Id === 1) {
        this.getMembers();
        console.log(1);
      } else if (Id && Id === 2) {
        this.getStaffs();
        console.log(2);
      }
    });
  }

  getMembers() {
    return this._authService.getUsers().subscribe(
      members => {
        this.membersList = members;
        this.membersListSize = members.length;
      },
      error => console.log(error)
    );
  }

  getStaffs() {
    return this._authService.getUsers().subscribe(
      staffs => {
        this.staffsList = staffs;
        this.staffsListSize = staffs.length;
      },
      error => console.log(error)
    );
  }

}
