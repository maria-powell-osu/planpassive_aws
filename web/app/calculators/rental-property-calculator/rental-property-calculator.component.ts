import { Component,OnInit } from '@angular/core';
import { RentalCalculatorService } from './rental-property-calculator.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LoanInformationComponent } from './templates/loan-information.component';
import { CashFlowComponent } from './templates/cashflow.component';
import { ResultsComponent } from './templates/results.component';


@Component({
    templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
     providers: [RentalCalculatorService]
})
export class RentalPropertyCalculatorComponent implements OnInit {
     loading : Boolean;
     view : string;
     cashFlowView: string;
     cashOnEquityView: string;
     totalReturnView: string;
     chartData : any;
     missingFields: any[];
     userWantedToViewResults : boolean;
     input = {} as any;

     constructor (private _rentalCalculatorService : RentalCalculatorService){}

     calculate (form :any): void {
        if(form.$valid)  {
            //Get the data for the tables, graphs etc.
            var results =  this._rentalCalculatorService.calculateResults(this.input);

            //Whenever we calculate new tables, I am resetting the tabs to show graph first
            //the reason why I added this is because the sizing gets messed up when they are hidden as they get drawn
            this.cashFlowView = 'graph';
            this.cashOnEquityView = 'graph';
            this.totalReturnView = 'graph';

            //A watch has been added in the mp-charts directive that triggers drawing of the graphs
            this.chartData = results;

            } else {
                //Generate list of missing fields
                this.missingFields = [];

                for(var i = 0; i < form.$error.required.length; i++){
                    this.userWantedToViewResults = true;
                    this.missingFields.push(form.$error.required[i].$name);
                }
            }
     }

     ngOnInit(): void {
         this.loading = false;
         this.view = "loan";
         this.cashFlowView = 'graph';
         this.cashOnEquityView = 'graph';
         this.totalReturnView = 'graph';
     }
    
}