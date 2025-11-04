import { Component, OnInit } from '@angular/core';
import { ViewTestRes } from '../../../contracts/ViewTestRes';
import { DashboardService } from '../../../service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../../util/constant';
import { AttemptService } from '../../../service/attempt.service';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss'],
    standalone: false
})
export class TestsComponent implements OnInit {

  data!:ViewTestRes;

  constructor(private dashService:DashboardService,private attempt:AttemptService,
    private router:Router,private auth:AuthService,private http:HttpClient,private route:ActivatedRoute) { }

  usr: string | null = null;
  testId!:string|null;
  ngOnInit(): void {

    if(!this.auth.getAccessToken()){
      this.router.navigate(["/login"]);
      return;
    }

    this.usr = this.auth.getUsername();
    this.testId = this.route.snapshot.paramMap.get('id');

    if(this.usr && this.testId){
      this.dashService.viewTestData(this.usr,this.testId).subscribe({
        next:(res:ViewTestRes)=>{
          this.data=res;
        },error: (err) =>console.error(err)

      })
    }

  }
  startTest(id: number): void {
    const durationMinutes = this.data.duration / 60;
    const confirmation = confirm(
      `Are you sure? Once started, it can't be canceled.\n\nThe test duration is ${durationMinutes} minutes.`
    );

    if (confirmation) {
      if(this.usr){

      this.attempt.attemptTest(id,this.usr).subscribe({
        next: (response) => {
          console.log('Test started successfully:', response);

          // redirect to attempt page (e.g. /attempt/:id)
          this.router.navigate(['/attempt', id,false]);
        },
        error: (error) => {
          console.error('Error starting test:', error);
          alert('Failed to start the test. Please try again.');
        }
      });
    }
    }
  }

  resumeTest(id:number){
    const confirmation = confirm(
      `Are you sure to resume the test?`
    );

    if (confirmation) {
      this.router.navigate(['/attempt', id,true]);
    
    }
  }

}
