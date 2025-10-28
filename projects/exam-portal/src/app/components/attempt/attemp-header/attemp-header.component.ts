import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attemp-header',
  standalone:false,
  templateUrl: './attemp-header.component.html',
  styleUrl: './attemp-header.component.scss'
})
export class AttempHeaderComponent {
  HeaderLogo = 'assets/public/images/logo/logo.png';
 constructor(private auth:AuthService,private router:Router){}
  ngOnInit(){
  
    if(!this.auth.getAccessToken()){
      this.router.navigate(["/login"]);
    }
  }
}


