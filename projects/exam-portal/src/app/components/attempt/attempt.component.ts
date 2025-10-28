import { Component } from '@angular/core';
import { AttempHeaderComponent } from './attemp-header/attemp-header.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { FooterComponent } from '../parts/footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeTestRes } from '../../contracts/ResumeTestRes';
import { AttemptService } from '../../service/attempt.service';
import { AttemptMcqPayload } from '../../contracts/AttemptMcqPayload';
import { interval, Subscription } from 'rxjs';
import { NextQsnRes } from '../../contracts/NextQsnRes';

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
  private questionStartTime: number = 0;
  private timerSub?: Subscription;
  elapsedSeconds: number = 0;
  prviouseQsnAnswered=true;

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

    this.questionStartTime = Date.now();
    this.startTimer();
  }
  nextQuestion(){
    if(this.usr){
    this.attemptService.getQuestion(this.testId,this.usr).subscribe({
      next:(res:NextQsnRes)=>{
        const q:ResumeTestRes = {
          id:res.id,
          title:res.title,
          problemStatement:res.problemStatement,
          problemStatementImg:res.problemStatementImg,
          o1:res.o1,
          o2:res.o2,
          o3:res.o3,
          o4:res.o4,
          o5:res.o5,
          type:res.type,
          attemptedAns:"",
          marks:res.marks
        }
        this.currentQsn=q;
        this.data.push(q);
      },error:(err)=> console.error("error: ",err)
    });
    }
    this.prviouseQsnAnswered=false;
  }

  changeAnswer(ans:string){
    const timeTakenInSeconds = Math.floor((Date.now() - this.questionStartTime) / 1000);

    const payload: AttemptMcqPayload = {
      userName: this.usr!,
      questionId: this.currentQsn.id,
      testId: this.testId,
      ans: ans,
      timeTakenInSeconds: timeTakenInSeconds 
    };
    this.attemptService.attemptMCQ(payload).subscribe({

    })
    this.prviouseQsnAnswered=true;
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.elapsedSeconds = 0;
    this.timerSub = interval(1000).subscribe(() => this.elapsedSeconds++);
  }
  
  stopTimer() {
    if (this.timerSub) this.timerSub.unsubscribe();
  }


  finishTest(){
    if(this.usr){
    this.attemptService.finishTest(this.testId,this.usr).subscribe({
     
    });

    this.router.navigate(['/dashboard/my'])
  }
  }

}
