import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  ViewName:string='';

  constructor() { }

  ngOnInit(): void {
  }
  viewChange(viewName:string):void{
    this.ViewName=viewName;
  }

}
