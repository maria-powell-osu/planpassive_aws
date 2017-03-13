import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RentalCalculatorService } from './rental-property-calculator.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgModule }      from '@angular/core';


@Component({
    templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
     providers: [RentalCalculatorService]
})
export class RentalPropertyCalculatorComponent implements OnInit {
     loading : Boolean;
     calcForm : FormGroup;
     view : String;


     constructor (private _rentalCalculatorService : RentalCalculatorService,
                  private fb: FormBuilder){}

     calculate (form :any): void {
        
     }

     ngOnInit(): void {
         this.view = 'loan';
         this.loading = false;
         this.calcForm = this.fb.group({       
            loanInfoView :  'bankLoan',
            li_purchasePrice : '',
            li_purchaseDate : this.getCurrentDate(),
            bl_loanName : '',
            bl_closingCost : '',
            bl_interest : '',
            bl_amortization : '',
            bl_downPaymentDollar : '',
            bl_downPaymentPercent : '',
            bl_extraPrincipal : '',
            bl_startDate : '',
            bl_endDate : ''

         });
     }

    private getCurrentDate(){
        var today = new Date();
        var dd : any= today.getDate();
        var mm : any= today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var result = mm+'/'+ dd +'/'+ yyyy;
        return result;
    }
    
}