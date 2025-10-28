import { Component } from '@angular/core';
import { AttempHeaderComponent } from './attemp-header/attemp-header.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { FooterComponent } from '../parts/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeTestRes } from '../../contracts/ResumeTestRes';
import { AttemptService } from '../../service/attempt.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrl: './attempt.component.scss',
  standalone:false
})
export class AttemptComponent {
  data!:ResumeTestRes[];
  currentQsn!:ResumeTestRes;
  usr:null|string =null;
  testId!:number;
  options:string[] =[];
  selectedOption: string | null = null;

  constructor(private auth:AuthService,private router:Router,private attemptService:AttemptService,private route: ActivatedRoute){}
  ngOnInit(){
    this.usr = this.auth.getUsername();
    if(!this.auth.getAccessToken()){
      this.router.navigate(["/login"]);
    }
    this.testId = Number(this.route.snapshot.paramMap.get('id'));

    if(this.usr && this.testId){
        this.attemptService.resumeTest(this.testId,this.usr).subscribe({
          next:(res:ResumeTestRes[])=>{
            this.data=res;
          }, error :(err) => console.error('Erros ',err)
        })
    }
  }

  showQuestion(i: number) {
    // Reset state first
    this.options = [];
    this.selectedOption = null;
  
    // Load new question
    this.currentQsn = this.data[i];
  
    // Build options array safely
    this.options = [
      this.currentQsn.o1,
      this.currentQsn.o2,
      this.currentQsn.o3,
      this.currentQsn.o4,
    ];
  
    if (this.currentQsn.o5) {
      this.options.push(this.currentQsn.o5);
    }
  
    // Restore previously attempted answer, if any
    if (this.currentQsn.attemptedAns) {
      this.selectedOption = this.currentQsn.attemptedAns;
    }
  }
  
}
