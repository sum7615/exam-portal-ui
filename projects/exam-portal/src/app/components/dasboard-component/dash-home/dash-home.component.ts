import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dash-home',
    templateUrl: './dash-home.component.html',
    styleUrls: ['./dash-home.component.scss'],
    standalone: false
})
export class DashHomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }
  }

}
