import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from '../components/home/home.component';
import {HeaderComponent} from '../components/parts/header/header.component'
import {FooterComponent} from '../components/parts/footer/footer.component'

@NgModule({
  declarations: [
    HomeComponent,HeaderComponent,FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
