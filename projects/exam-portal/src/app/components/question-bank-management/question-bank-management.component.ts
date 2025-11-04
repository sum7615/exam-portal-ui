import { Component } from '@angular/core';
import { ManagementService } from '../../service/management.service';
import { AuthService } from '../../service/auth.service';
import { FetchQuestionBankRes } from '../../contracts/FetchQuestionBankRes';
import { Router } from '@angular/router';
import { DeleteQuestionBankPayload } from '../../contracts/DeleteQuestionBankPayload';
import { UpdateQuestionBankPayload } from '../../contracts/UpdateQuestionBankPayload';
import { AddQuestionBankPayload } from '../../contracts/AddQuestionBankPayload';
import { CreateRes } from '../../contracts/CreateRes';

@Component({
  selector: 'app-question-bank-management',
  standalone: false,
  templateUrl: './question-bank-management.component.html',
  styleUrl: './question-bank-management.component.scss'
})
export class QuestionBankManagementComponent {

  usr: null | string = null;
  data!: FetchQuestionBankRes[];
  selectedBank: any=null;

  bankName = '';
  description = '';
  questionType = '';
  
  constructor(private managementService: ManagementService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/login']);
    }
    this.usr = this.auth.getUsername();
    if (this.usr) {
      this.managementService.fetchQuestionBank(this.usr).subscribe({
        next: (res: FetchQuestionBankRes[]) => {
          this.data = res;
        }, error: (err) => console.error("Error ", err)
      })
    }

  }

  onSubmit() {

    if (this.selectedBank) {
      if (this.usr) {
        const payload: UpdateQuestionBankPayload = {
          id: this.selectedBank.id,
          userName: this.usr,
          description: this.description,
          name: this.bankName,
          type: this.questionType
        }
        this.managementService.updateQuestionBank(payload).subscribe({
          next(data: string) {

          }, error: (err) => console.error("Error: ", err)
        })
        this.selectedBank.name=this.bankName;
        this.selectedBank.description=this.description;
        this.selectedBank.questionType=this.questionType;

        // let toAdd: FetchQuestionBankRes={
        //   description:payload.description,
        //   id:payload.id,
        //   name:payload.name,
        //   questionType:payload.type
        // }

        // const index = this.data.indexOf(this.selectedBank);
        // if (index > -1) {
        //   this.data.splice(index, 1);
        // }
        // this.data.push(toAdd)



      } else {
        this.router.navigate(['/login']);
      }
      
    }else{
      if (this.usr) {

      const payload:AddQuestionBankPayload ={
        createdBy:this.usr,
        description:this.description,
        name:this.bankName,
        questionType:this.questionType
      } 

      this.managementService.addQuestionBank(payload).subscribe({
        next:(data:CreateRes) =>{
        let toAdd: FetchQuestionBankRes={
          description:this.description,
          id:data.id,
          name:this.bankName,
          questionType:this.questionType
        }
        this.data.push(toAdd);

        }, error: (err) => console.error("Error: ", err)
      })

    } else {
      this.router.navigate(['/login']);
    }
    }

  }

  editBank(bank: FetchQuestionBankRes) {
    this.selectedBank = bank;
    this.bankName = bank.name;
    this.description = bank.description;
    this.questionType = bank.questionType;
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.selectedBank = null;
    this.bankName = '';
    this.description = '';
    this.questionType = '';
  }

  deleteBank(id: number) {
    if (confirm('Are you sure you want to delete this question bank?')) {
      if (this.usr) {
        const payload: DeleteQuestionBankPayload = {
          id: id,
          userName: this.usr
        }
        this.managementService.deleteQuestionBank(payload).subscribe({
          next(data: string) {

          }, error: (err) => console.error("Error: ", err)
        })
        this.data=this.data.filter(e=>e.id!=id);

      } else {
        this.router.navigate(['/login']);
      }
    }
  }

}
