import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for',
  templateUrl: './for.component.html',
  styleUrls: ['./for.component.scss']
})
export class ForComponent implements OnInit {

  public Menu:string[]=[
    "Electronic",
    "Fashion"
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
