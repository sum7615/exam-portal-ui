import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../../service/dashboard.service';
import { DashBoadRes, PastTest } from '../../../contracts/DashBoardRes';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss'],
  standalone: false
})
export class DashHomeComponent implements OnInit {
  data!: DashBoadRes;
  usr: string | null = null;
  isLoading: boolean = true;
  Math = Math;

  alltest:any[]=[];

  constructor(private auth: AuthService, private router: Router, private http: HttpClient, private dashBoard: DashboardService) {}


  ngOnInit(): void {
    const token = this.auth.getAccessToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.usr = this.auth.getUsername();

    if (this.usr) {
      this.dashBoard.loadDashboardData(this.usr).subscribe({
        next: (res: DashBoadRes) => {
          this.data = res;
          this.isLoading = false;
          this.alltest = [...(this.data?.upcoming || []), ...(this.data?.past || [])];
        }, error: (err) => console.error('Error loading profile:', err)
      });
    }


  }
  selectedIndex: number = 0;

  prevDate() {
    if (this.selectedIndex > 0) this.selectedIndex--;
  }

  nextDate() {
    if (this.selectedIndex < this.data.upcoming.length - 1) this.selectedIndex++;
  }

  viewTest(id:number){
    this.router.navigate(['dashboard/my/test', id]);
  }
  getDateDisplay(index: number) {
    const date = new Date(this.alltest[index].startTime);
    return `${date.getDate()} ${date.toLocaleString('en-US', { weekday: 'short' })}`;
  }
    
}
