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
     view : string;
     resultData : any;


     constructor (private _rentalCalculatorService : RentalCalculatorService,
                  private fb: FormBuilder,
                  private _calculatorFormService : CalculatorFormService){}

     ngOnInit(): void {
         this.view = 'loan';
         this.calcForm = this._calculatorFormService.calcForm;
         this._calculatorFormService.addEventListeners(this.calcForm);
     } 

}