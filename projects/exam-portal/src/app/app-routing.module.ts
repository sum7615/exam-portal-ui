import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ContactComponent } from "./components/contact/contact.component";
import { TermsComponent } from "./components/terms/terms.component";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
const routes:Routes =[
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:"home",component:HomeComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:"contact",component:ContactComponent},
    {path:"terms",component:TermsComponent},
    {path:"dashboard",component:DashboardComponent},
    {path:"**",component:NotFoundComponent},
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