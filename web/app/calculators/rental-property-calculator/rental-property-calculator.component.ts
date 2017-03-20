import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { RentalCalculatorService } from './rental-property-calculator.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgModule }      from '@angular/core';
import { CalculatorFormService } from './form/calculator-form.service';


@Component({
    templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
    providers: [RentalCalculatorService, CalculatorFormService]
})
export class RentalPropertyCalculatorComponent implements OnInit {
     loading : Boolean;
     calcForm : FormGroup;
     view : String;
     resultData : any;


     constructor (private _rentalCalculatorService : RentalCalculatorService,
                  private fb: FormBuilder,
                  private _calculatorFormService : CalculatorFormService){}

     calculate (form :any): void {
        //setting this to true, highlights missing fields now in form
        this.calcForm.patchValue({'userClickedResults': true});

        //Only run calculation if the required inputs are there and valid
        if(this.calcForm.valid){
            this.resultData = this._rentalCalculatorService.calculateResults(this.calcForm);


            //Whenever we calculate new tables, I am resetting the tabs to show graph first
            //the reason why I added this is because the sizing gets messed up when they are hidden as they get drawn
            //vm.cashFlowView = 'graph';
            //vm.cashOnEquityView = 'graph';
            //vm.totalReturnView = 'graph';

            //A watch has been added in the mp-charts directive that triggers drawing of the graphs
            //vm.chartData = results;
        }
     }

     ngOnInit(): void {
         this.view = 'loan';
         this.loading = false;
         this.calcForm = this._calculatorFormService.calcForm;
         this._calculatorFormService.addEventListeners(this.calcForm);
     } 
}