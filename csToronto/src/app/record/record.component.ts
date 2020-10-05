import { Component, OnInit } from '@angular/core';
// import { IRecord } from './record';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  // record: IRecord;
  parameter: any;
  recordList: Array<any>;
  recordFields = ['Id', 'Problems', 'Other Problems', 'Address', 'Community Council Area', 'Date'];
  recordListSize: any;
  page: Number = 1;

  constructor(private _authService: AuthService,
              private _activatedRoute: ActivatedRoute) {
              }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe( params => {
      this.parameter = params.get('recordParameter');
      this.showProblems(this.parameter);
    });
  }

  showProblems(value: any) {
    console.log(value);
    this._authService.getReports(value)
                     .subscribe(res => {
                        this.recordList = res;
                        this.recordListSize = this.recordList.length;
                        console.log(this.recordListSize);
                      },
                      error => {
                        console.log(error);
                      });
  }
}

