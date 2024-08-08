import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../components/home/home.component';
import {HeaderComponent} from '../components/parts/header/header.component'
import {FooterComponent} from '../components/parts/footer/footer.component'
import { ContentProjectionComponent } from '../components/parts/content-projection/content-projection.component';
import { SwitchComponent } from '../components/parts/switch/switch.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContentProjectionComponent,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [SwitchComponent]
})
export class AppModule { }
