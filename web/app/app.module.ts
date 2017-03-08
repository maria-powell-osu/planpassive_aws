//Pre-Built Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";

//Plan Passive Components
import { BlogListComponent} from "./blogs/blog-list/blog-list.component";
import { BlogViewComponent } from "./blogs/blog-view/blog-view.component"; 
import { HomeComponent } from "./home/home.component";
import { CalculatorsComponent }  from "./calculators/calculators.component";
import { RentalPropertyCalculatorComponent} from "./calculators/rental-property-calculator/rental-property-calculator.component";
import { InvestmentReturnCalculatorComponent } from "./calculators/investment-return-calculator/investment-return-calculator.component";  
import { AppComponent }  from './app.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { CashFlowComponent } from "./calculators/rental-property-calculator/templates/cashflow.component";
import { LoanInformationComponent } from './calculators/rental-property-calculator/templates/loan-information.component';
import { ResultsComponent } from './calculators/rental-property-calculator/templates/results.component';


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      //Gets matched on first-match basis
      {path: 'home', component: HomeComponent},
      {path: 'blogs', component: BlogListComponent},
      {path: 'blog/:name', component: BlogViewComponent},
      {path: 'investment-calculators', component: CalculatorsComponent},
      {path: 'rental-property-calculator', component: RentalPropertyCalculatorComponent},
      {path: 'investment-return-calculator', component: InvestmentReturnCalculatorComponent},
      {path:  '', redirectTo: "home", pathMatch: "full"}
    ])
     ],
  declarations: [ 
    AppComponent,
    BlogViewComponent,
    BlogListComponent,
    HomeComponent,
    NavbarComponent,
    CalculatorsComponent,
    RentalPropertyCalculatorComponent,
    InvestmentReturnCalculatorComponent,
    LoaderComponent,
    CashFlowComponent,
    LoanInformationComponent,
    ResultsComponent
     ],
  bootstrap: [
     AppComponent
     ]
})
export class AppModule { }
