import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ManagementService } from '../../service/management.service';
import { FetchTestAdmin } from '../../contracts/FetchTestAdmin';
import { FetchQuestionBankRes } from '../../contracts/FetchQuestionBankRes';
import { ColDef, GridApi, GridReadyEvent } from 'node_modules/ag-grid-community/dist/types/src/main-umd-noStyles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTestPayload } from '../../contracts/CreateTestPayload';
import { UpdateTestPayload } from '../../contracts/UpdateTestPayload';
import { DeleteTestPayload } from '../../contracts/DeleteTestPayload';

@Component({
  selector: 'app-test-management',
  standalone: false,
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.scss'
})
export class TestManagementComponent {

  data!: FetchTestAdmin[];
  usr: string | null = null;
  selectedTest!: FetchTestAdmin | null;
  allQuestionbank!: FetchQuestionBankRes[];
  testForm!: FormGroup;
  isEditMode = false;

  // Ag grid
  // Custom overlay text
  overlayLoadingTemplate = `<div class="ag-overlay-loading-center">⏳ Loading test...</div>`;
  overlayNoDataTemplate = `<div class="ag-overlay-no-rows-center">❌ No test available</div>`;
  private gridApi!: GridApi;
  // Pagination settings
  pagination = true;
  paginationPageSize = 5; // items per page
  paginationPageSizeSelector = [5, 10, 20, 50];


  constructor(private router: Router, private auth: AuthService,
    private manageService: ManagementService, private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.auth.hasAccessToken()) {
      this.router.navigate(['/login']);
    }

    this.usr = this.auth.getUsername();
    this.initForm();
    if (this.usr) {
      this.manageService.fetchTest(this.usr).subscribe({
        next: (data: FetchTestAdmin[]) => {
          this.data = data;
        }
      })

      this.manageService.fetchQuestionBank(this.usr).subscribe({
        next: (res: FetchQuestionBankRes[]) => {
          this.allQuestionbank = res;
        }, error: (err) => console.error("Error ", err)
      })
    }
  }
  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'name', sortable: true, filter: true, flex: 1 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, flex: 1 },
    { headerName: 'Total Marks', field: 'totalMarks', sortable: true, filter: true, flex: 1 },
    { headerName: 'Total Questions', field: 'totalQuestions', sortable: true, filter: true, flex: 1 },
    { headerName: 'Level', field: 'testLevel', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Action',
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

  questionBankColumnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, flex: 1 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, flex: 1 },
    { headerName: 'Question Type', field: 'questionType', sortable: true, filter: true, flex: 1 },

  ]
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
    this.testForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      totalMarks: [0, [Validators.required, Validators.min(1)]],
      totalQuestions: [0, [Validators.required, Validators.min(1)]],
      passMark: [0, [Validators.required, Validators.min(1)]],
      testLevel: ['', Validators.required],
      questionBankId: ['', Validators.required],
    });
  }
  onEdit(test: FetchTestAdmin) {
    this.isEditMode = true;
    this.selectedTest = test;
    this.testForm.patchValue(test);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  onSubmit() {
    if (this.testForm.invalid) return;

    if (this.isEditMode) {
      if (this.usr) {
        const payload: UpdateTestPayload = {
          userName: this.usr,
          name: this.testForm.get('name')?.value,
          description: this.testForm.get('description')?.value,
          duration: this.testForm.get('duration')?.value,
          startTime: this.testForm.get('startTime')?.value,
          endTime: this.testForm.get('endTime')?.value,
          passMark: this.testForm.get('passMark')?.value,
          questionBankId: this.testForm.get('questionBankId')?.value,
          testLevel: this.testForm.get('testLevel')?.value,
          totalMarks: this.testForm.get('totalMarks')?.value,
          totalQuestions: this.testForm.get('totalQuestions')?.value,
          id: this.testForm.get('id')?.value,
          isActive: this.testForm.get('isActive')?.value,
        }
        this.manageService.updateTest(payload).subscribe({
          next: () => {
            alert('✅ Test updated successfully!');
            this.resetForm();
            this.refreshData();
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {

      if (this.usr) {
        const payload: CreateTestPayload = {
          createdBy: this.usr,
          name: this.testForm.get('name')?.value,
          description: this.testForm.get('description')?.value,
          duration: this.testForm.get('duration')?.value,
          startTime: this.testForm.get('startTime')?.value,
          endTime: this.testForm.get('endTime')?.value,
          passMark: this.testForm.get('passMark')?.value,
          questionBankId: this.testForm.get('questionBankId')?.value,
          testLevel: this.testForm.get('testLevel')?.value,
          totalMarks: this.testForm.get('totalMarks')?.value,
          totalQuestions: this.testForm.get('totalQuestions')?.value
        }

        this.manageService.createTest(payload).subscribe({
          next: () => {
            alert('✅ Test added successfully!');
            this.resetForm();
            this.refreshData();
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  refreshData() {
    if (this.usr) {
      this.manageService.fetchTest(this.usr).subscribe({
        next: (data: FetchTestAdmin[]) => (this.data = data)
      });
    }
  }

  resetForm() {
    this.testForm.reset();
    this.isEditMode = false;
    this.selectedTest = null;
  }
  deleteTest(id:number){
    if(this.usr){
      const payload:DeleteTestPayload={
        id:id,
        userName:this.usr
      }
      this.manageService.deleteTest(payload).subscribe(()=>{
        alert("Test deleted");
      })
    }
  }

}
