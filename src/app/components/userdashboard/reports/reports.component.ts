import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() {
    console.log("inside constructor")
   }

  ngOnInit(): void {
    console.log('inside init')
  }

}
