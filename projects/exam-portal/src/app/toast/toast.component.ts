import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  show = false;

  ngOnInit() {
    this.show = true;

    // Auto hide after 5 seconds
    setTimeout(() => {
      this.show = false;
    }, 5000);
  }
}
