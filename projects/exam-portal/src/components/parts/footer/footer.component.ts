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
  home:string;
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.tcLink="/exam-portal/terms&conditions/";
    this.ppLink="/exam-portal/privacy-policy/";
    this.helpLink="/exam-portal/help/";
    this.home="/examp-portal/";
  }
  ngOnInit(): void {
  }

}
