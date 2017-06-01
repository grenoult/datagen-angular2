import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { MainformComponent } from './mainform.component';
import { FieldRowComponent } from './field.component';
import { DataService }   from './data.service';
import {FormsModule} from '@angular/forms';
import {ResultHtmlComponent} from "./resulthtml.component";

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, MainformComponent, FieldRowComponent, ResultHtmlComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ DataService ]
})
export class AppModule { }
