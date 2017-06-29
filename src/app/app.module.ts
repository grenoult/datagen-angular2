import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { MainformComponent } from './mainform.component';
import { FieldRowComponent } from './field.component';
import { DataService }   from './data.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResultComponent } from './result.component';
import { AboutComponent } from './about.component';
import { HelpComponent } from './help.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: '',
    pathMatch: 'full',
    component: MainformComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, MainformComponent, FieldRowComponent, ResultComponent, AboutComponent, HelpComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ DataService ]
})
export class AppModule { }
