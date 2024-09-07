import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import { HomeComponent } from './components/home/home.component';
import {HeaderComponent} from './components/parts/header/header.component'
import {FooterComponent} from './components/parts/footer/footer.component'
import { ContentProjectionComponent } from './components/parts/content-projection/content-projection.component';
import { SwitchComponent } from './components/parts/switch/switch.component';
import { ForComponent } from './components/parts/for/for.component';
import { ShooperComponent } from './components/demos/shooper/shooper.component';
import { FilterComponent } from './components/demos/filter/filter.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetComponent } from './components/forget/forget.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContentProjectionComponent,
    SwitchComponent,
    ForComponent,
    ShooperComponent,
    FilterComponent,
    LoginComponent,
    TermsComponent,
    ContactComponent,
    PrivacyComponent,
    NotFoundComponent,
    AppComponent,
    DashboardComponent,
    ForgetComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
