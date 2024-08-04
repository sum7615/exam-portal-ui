import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number;
  tcLink: string;
  ppLink:string;
  helpLink:string;
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.tcLink="#";
    this.ppLink="#";
    this.helpLink="#";
  }
  ngOnInit(): void {
  }

}
