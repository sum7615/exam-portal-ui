import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../components/home/home.component';
import {HeaderComponent} from '../components/parts/header/header.component'
import {FooterComponent} from '../components/parts/footer/footer.component'
import { ContentProjectionComponent } from '../components/parts/content-projection/content-projection.component';

@NgModule({
  declarations: [
    HomeComponent,HeaderComponent,FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule 
  ],
  providers: [],
  bootstrap: [ContentProjectionComponent]
})
export class AppModule { }
