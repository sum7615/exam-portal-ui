import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ContactComponent } from "./components/contact/contact.component";
import { TermsComponent } from "./components/terms/terms.component";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ForgetComponent } from "./auth/forget/forget.component";
import { DashHomeComponent } from "./components/dasboard-component/dash-home/dash-home.component";
import { TestsComponent } from "./components/dasboard-component/tests/tests.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AttemptComponent } from "./components/attempt/attempt.component";
import { AddTestComponent } from "./components/add-test/add-test.component";
import { QuestionComponent } from "./components/question/question.component";
import { QuestionBankComponent } from "./components/question-bank/question-bank.component";
import { ViewQuestionBankComponent } from "./components/view-question-bank/view-question-bank.component";
import { ViewQuestionComponent } from "./components/view-question/view-question.component";
import { ViewTestComponent } from "./components/view-test/view-test.component";
const routes:Routes =[
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:"home",component:HomeComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:"contact",component:ContactComponent},
    {path:"terms",component:TermsComponent},
    {path:"attempt/:id/:resume",component:AttemptComponent},

    {path:"dashboard",component:DashboardComponent,
      children:[
        {path:"my",component:DashHomeComponent},
        {path:"my/test/:id",component:TestsComponent},
        {path:"my/profile",component:ProfileComponent},
        
        {path:"test/add",component:AddTestComponent},
        {path:"test/view",component:ViewTestComponent},
    
        {path:"question/add",component:QuestionComponent},
        {path:"question/view",component:ViewQuestionComponent},
    
        {path:"question/bank/add",component:QuestionBankComponent},
        {path:"question/bank/view",component:ViewQuestionBankComponent}
      ]
    },
    {path:"forget",component:ForgetComponent},
    {path:"**",component:NotFoundComponent}
];
@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule],
providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // {provide:APP_BASE_HREF,useValue:'/'}
  ]
})

export class AppRoutingModule{};