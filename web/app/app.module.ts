//Pre-Built Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

//Plan Passive Components
import { BlogListComponent} from "./blogs/blog-list/blog-list.component";
import { BlogViewComponent } from "./blogs/blog-view/blog-view.component"; 
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
      {path: 'home', component: HomeComponent},
      {path: 'blogs', component: BlogListComponent},
      {path: 'blog/:name', component: BlogViewComponent},
      {path:  '', redirectTo: "home", pathMatch: "full"}
    ])
     ],
  declarations: [ 
    AppComponent,
    BlogViewComponent,
    BlogListComponent,
    HomeComponent,
    NavbarComponent
     ],
  bootstrap: [
     AppComponent
     ]
})
export class AppModule { }
