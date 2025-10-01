import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit ,AfterViewInit {

  mobileQuery: MediaQueryList;
  HeaderLogo = 'assets/public/images/logo/logo.png';
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  @ViewChild('snav') snav!: MatSidenav;
  private _mobileQueryListener: () => void;

  constructor(private auth:AuthService,private router:Router) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    if(!this.auth.getAccessToken()){
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit(): void {
    this.snav.open();
  }

  logout() {
    this.auth.logout();  
  }

  loadProfile() {
    this.router.navigate(['dashboard/my/profile']);
  }
}
