import { Component, OnInit } from '@angular/core';
import { LookUpDataContact } from '../../contracts/LookUpDataContract';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    // if (this.auth.getAccessToken()) {
    //   this.router.navigate(['/dashboard/my']);
    // }else{
    //   this.router.navigate(['/login']);
    // }
  }

}
