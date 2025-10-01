import { Component, OnInit } from '@angular/core';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor() {}
  
  ngOnInit(): void {
  }

}
