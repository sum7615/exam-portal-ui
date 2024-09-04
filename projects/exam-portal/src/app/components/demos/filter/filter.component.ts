import { Component, OnInit,Input,Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryCountContract } from 'projects/exam-portal/src/app/contracts/CategoryCount';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit ,OnChanges{
ngOnChanges(changes: SimpleChanges): void {
  
}
 @Input() CategoryCount:CategoryCountContract={
    all:0,
    men:0,
    electronic:0,
    jeweller:0,
    women:0,
  }

  @Input() AllCategory:string[]=[];

  @Output() CategoryChange:EventEmitter<any>= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  getCategoryCount(category: string): number {
    switch (category.toLowerCase()) {
      case 'men\'s clothing':
        return this.CategoryCount.men;
      case 'electronics':
        return this.CategoryCount.electronic;
      case 'women\'s clothing':
        return this.CategoryCount.women;
      case 'jewelery':
        return this.CategoryCount.jeweller;
      case 'all':
        return this.CategoryCount.all;
      default:
        return 0;
    }
  }
  FilterProduct(cat:any):void{
    this.CategoryChange.emit(cat);
  }
}
