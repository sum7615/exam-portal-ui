import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-projection',
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.scss']
})
export class ContentProjectionComponent implements OnInit {
  public View: TemplateRef<any> | null = null;

  @ViewChild('View1', { static: true }) public View1: TemplateRef<any> | null = null;
  @ViewChild('View2', { static: true }) public View2: TemplateRef<any> | null = null;
  @ViewChild('View3', { static: true }) public View3: TemplateRef<any> | null = null;
  @ViewChild('View4', { static: true }) public View4: TemplateRef<any> | null = null;
  @ViewChild('View5', { static: true }) public View5: TemplateRef<any> | null = null;
  @ViewChild('View6', { static: true }) public View6: TemplateRef<any> | null = null;
  @ViewChild('View7', { static: true }) public View7: TemplateRef<any> | null = null;

  ngOnInit(): void {
    this.View = this.View1;
  }

  changeView(viewName: string): void {
    switch (viewName) {
      case 'view1':
        this.View = this.View1;
        break;
      case 'view2':
        this.View = this.View2;
        break;
      case 'view3':
        this.View = this.View3;
        break;
      case 'view4':
        this.View = this.View4;
        break;
      case 'view5':
        this.View = this.View5;
        break;
      case 'view6':
        this.View = this.View6;
        break;
      case 'view7':
        this.View = this.View7;
        break;
    }
  }
}
