import { Component, OnInit,Input } from '@angular/core';
import { LookUpDataContact } from 'projects/exam-portal/src/app/contracts/LookUpDataContract';
import { OnLoad } from 'projects/exam-portal/src/app/service/OnLoad';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() HeaderLogo:string|undefined='';
  
  ngOnInit(): void {

  }

}
