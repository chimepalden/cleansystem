import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  wards: [
    { ward: '', problems: [ { add: '', problems: '' }] }
  ];
  constructor() { }

  ngOnInit() {
  }

}
