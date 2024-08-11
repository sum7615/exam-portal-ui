import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { HomeComponent } from '../components/home/home.component';
import {HeaderComponent} from '../components/parts/header/header.component'
import {FooterComponent} from '../components/parts/footer/footer.component'
import { ContentProjectionComponent } from '../components/parts/content-projection/content-projection.component';
import { SwitchComponent } from '../components/parts/switch/switch.component';
import { ForComponent } from '../components/parts/for/for.component';
import { ShooperComponent } from '../components/demos/shooper/shooper.component';
import { FilterComponent } from '../components/demos/filter/filter.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContentProjectionComponent,
    SwitchComponent,
    ForComponent,
    ShooperComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
