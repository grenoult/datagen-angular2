import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { MainformComponent } from './mainform.component';
import { FieldRowComponent } from './field.component';
import { DataService }   from './data.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResultComponent} from './result.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, MainformComponent, FieldRowComponent, ResultComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ DataService ]
})
export class AppModule { }
