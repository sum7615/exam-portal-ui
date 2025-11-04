import { Component } from '@angular/core';
import { ManagementService } from '../../service/management.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FetchQuestionBankRes } from '../../contracts/FetchQuestionBankRes';
import { FetchQuestion } from '../../contracts/FetchQuestion';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddQuestionPayload } from '../../contracts/AddQuestionPayload';
import { UpdateQuestionPayload } from '../../contracts/UpdateQuestionPayload';
import { P, T } from '@angular/cdk/keycodes';
import { DeleteQuestionPayload } from '../../contracts/DeleteQuestionPayload';

@Component({
  selector: 'app-question-management',
  standalone: false,
  templateUrl: './question-management.component.html',
  styleUrl: './question-management.component.scss'
})
export class QuestionManagementComponent {
  usr: null | string = null;
  data!: FetchQuestion[];
  allQuestionbank!: FetchQuestionBankRes[];
  selectedQuestion!: FetchQuestion | null;
  selectedQuestionBank!: number;
  questionForm!: FormGroup;
  updating: boolean = false;
  // Pagination settings
  pagination = true;
  paginationPageSize = 5; // items per page
  paginationPageSizeSelector = [5, 10, 20, 50];
  // Custom overlay text
  overlayInitialTemplate = `<div class="ag-overlay-no-rows-center">📘 Select question bank to see questions</div>`;
  overlayLoadingTemplate = `<div class="ag-overlay-loading-center">⏳ Loading test...</div>`;
  overlayNoDataTemplate = `<div class="ag-overlay-no-rows-center">❌ No test available for the question bank</div>`;
  private gridApi!: GridApi;


  constructor(private managementService: ManagementService, private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }
    this.initForm();

    this.usr = this.auth.getUsername();
    if (this.usr) {
      this.managementService.fetchQuestionBank(this.usr).subscribe({
        next: (res: FetchQuestionBankRes[]) => {
          this.allQuestionbank = res;
        }, error: (err) => console.error("Error ", err)
      })
    }
  }

  changeQuestionBank(questionbankId: number) {
    this.selectedQuestionBank = questionbankId;

    if (this.usr) {
      this.managementService.fetchQuestion(this.usr, questionbankId).subscribe({
        next: (res: FetchQuestion[]) => {
          this.data = res;
          if (!res || res.length === 0) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
        }, error: (err) => console.error("Error ", err)
      })
    } else {
      this.router.navigate(['/login']);
    }
  }

  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true, flex: 1 },
    { headerName: 'Mark', field: 'mark', sortable: true, filter: true, width: 120 },
    { headerName: 'Level', field: 'level', sortable: true, filter: true, width: 150 },
    { headerName: 'Action',
      field: 'action',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Edit';
        button.className = 'text-blue-600 hover:underline cursor-pointer';
        button.addEventListener('click', () => {
          this.onEdit(params.data)
        });
        return button;
      },
      width: 120
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,

  };
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    if (!this.data || this.data.length === 0) {
      this.gridApi.showNoRowsOverlay();
    }
  }
  refreshOverlay() {
    if (this.data.length === 0) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.gridApi.hideOverlay();
    }
  }


  initForm() {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      problemStatement: ['', Validators.required],
      problemStatementImg: [''],
      o1: ['', Validators.required],
      o2: ['', Validators.required],
      o3: ['', Validators.required],
      o4: ['', Validators.required],
      o5: [''],
      ans: ['', Validators.required],
      mark: [1, [Validators.required, Validators.min(1)]],
      level: ['', Validators.required],
      type:['',Validators.required]
    });
  }
  onEdit(question: FetchQuestion) {
    this.updating=true;
    this.selectedQuestion = question;
    this.questionForm.patchValue(question);
    console.log('Editing question level:', question.level);

  }

  onSubmit() {
    if (this.questionForm.invalid || !this.usr) return;



      if (this.updating && this.selectedQuestion) {
        // ✏️ Update existing question
        const payload: UpdateQuestionPayload = {
          id: this.selectedQuestion.id,
          questionBankId: this.selectedQuestionBank,
          userName: this.usr,
          title: this.questionForm.get('title')?.value,
          problemStatement: this.questionForm.get('problemStatement')?.value,
          problemStatementImg: this.questionForm.get('problemStatementImg')?.value,
          o1: this.questionForm.get('o1')?.value,
          o2: this.questionForm.get('o2')?.value,
          o3: this.questionForm.get('o3')?.value,
          o4: this.questionForm.get('o4')?.value,
          o5: this.questionForm.get('o5')?.value,
          ans: this.questionForm.get('ans')?.value,
          mark: this.questionForm.get('mark')?.value,
          type: this.questionForm.get('type')?.value,
          level: this.questionForm.get('level')?.value

        }
        this.managementService.updateQuestion(payload).subscribe({
          next: () => {
            alert('Question updated successfully!');
            this.refreshQuestions();
            this.resetForm();

            const tmpData:FetchQuestion={
              id:payload.id,
              ans:payload.ans,
              level:payload.level,
              mark:payload.mark,
              o1: payload.o1,
              o2: payload.o2,
              o3: payload.o3,
              o4: payload.o4,
              o5: payload.o5,
              problemStatement: payload.problemStatement,
              problemStatementImg: payload.problemStatementImg,
              title:payload.title,
              type:payload.type
            }
            this.data.push(tmpData);
            this.updating=false;

          },
          error: (err) => console.error('Error updating question:', err)
        });
      } else {
        
        const payload: AddQuestionPayload = {
          title: this.questionForm.get('title')?.value,
          problemStatement: this.questionForm.get('problemStatement')?.value,
          problemStatementimg: this.questionForm.get('problemStatementImg')?.value,
          o1: this.questionForm.get('o1')?.value,
          o2: this.questionForm.get('o2')?.value,
          o3: this.questionForm.get('o3')?.value,
          o4: this.questionForm.get('o4')?.value,
          o5: this.questionForm.get('o5')?.value,
          questionBankId: this.selectedQuestionBank,
          ans: this.questionForm.get('ans')?.value,
          createdBy: this.usr,
          mark: this.questionForm.get('mark')?.value,
          type: this.questionForm.get('type')?.value,
          level: this.questionForm.get('level')?.value
        };
          this.managementService.addQuestion(payload).subscribe({
          next: (res:number) => {
            alert('Question added successfully!');
            this.refreshQuestions();
            this.resetForm();
            const tmpData:FetchQuestion={
              id:res,
              ans:payload.ans,
              level:payload.level,
              mark:payload.mark,
              o1: payload.o1,
              o2: payload.o2,
              o3: payload.o3,
              o4: payload.o4,
              o5: payload.o5,
              problemStatement: payload.problemStatement,
              problemStatementImg: payload.problemStatementimg,
              title:payload.title,
              type:payload.type
            }
            this.data.push(tmpData);
          },
          error: (err) => console.error('Error adding question:', err)
        });
      
    }
  }

  refreshQuestions() {
    if (this.usr && this.selectedQuestionBank) {
      this.changeQuestionBank(this.selectedQuestionBank);
    }
  }
  

  resetForm() {
    this.questionForm.reset({
      mark: 1,
      level: '',
    });
    this.selectedQuestion = null;
  }

  deleteQuestion(id:number){

    if(this.usr){
    const payload:DeleteQuestionPayload={
      id:id,
      userName:this.usr
    }
    this.managementService.deleteQuestion(payload).subscribe(()=>{
      alert("Question Deleted.")
      this.selectedQuestion=null;
      this.data = this.data.filter(e=>e.id!=id);
      this.resetForm();
    })
  }else{
    this.router.navigate(['/login']);
  }
  }
}
