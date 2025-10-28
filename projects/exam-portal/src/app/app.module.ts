import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/parts/header/header.component'
import { FooterComponent } from './components/parts/footer/footer.component'
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetComponent } from './auth/forget/forget.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashHomeComponent } from './components/dasboard-component/dash-home/dash-home.component';
import { TestsComponent } from './components/dasboard-component/tests/tests.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AttempHeaderComponent } from './components/attempt/attemp-header/attemp-header.component';
import { AttemptComponent } from './components/attempt/attempt.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
@NgModule({
    declarations: [
        RegisterComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        TermsComponent,
        ContactComponent,
        PrivacyComponent,
        NotFoundComponent,
        AppComponent,
        DashboardComponent,
        ForgetComponent,
        ProfileComponent,
        DashHomeComponent,
        TestsComponent,
        AttempHeaderComponent,
        AttemptComponent
   ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatToolbar,
        MatRadioModule,
        LayoutModule,
        FormsModule,
        MatSidenavModule], providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
