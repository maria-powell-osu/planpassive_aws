//Pre-Built Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

//Plan Passive Components
import { BlogsComponent} from "./blogs/blogs.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent }  from './app.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";

//Plan Passive Services

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      //Gets matched on first-match basis
      {path: 'blogs', component: BlogsComponent},
      {path:  'home', component: HomeComponent},
      {path:  '', redirectTo: "home", pathMatch: "full"}
    ])
     ],
  declarations: [ 
    AppComponent,
    BlogsComponent,
    HomeComponent,
    NavbarComponent
     ],
  bootstrap: [
     AppComponent
     ]
})
export class AppModule { }
