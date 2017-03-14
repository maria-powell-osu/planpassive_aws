import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
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
            li_purchaseDate : this._rentalCalculatorService.getCurrentDate(),
            bl_loanName : '',
            bl_closingCost : '',
            bl_interest : '',
            bl_amortization : '',
            bl_downPaymentDollar : '',
            bl_downPaymentPercent : '',
            bl_extraPrincipal : '',
            bl_startDate : '',
            bl_endDate : '',
            loans : this.fb.array([ this._rentalCalculatorService.buildLoan() ]),
            specialTermsLoans : this.fb.array([ this._rentalCalculatorService.buildSpecialTermsLoan() ]),
            units : this.fb.array([this._rentalCalculatorService.buildUnit() ]),
            supplementalIncomes : this.fb.array([this._rentalCalculatorService.buildSupplementalIncome()]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities : this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: '',
            o_insurance: '',
            m_costAmount: '',
            expenses : this.fb.array([]),
            capitalExpenditures: this.fb.array([ this._rentalCalculatorService.buildCapitalExpenditure() ]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: '',
            o_vacancyRate: '',
            ri_annualRentIncrease: '',
            e_annualExpenseIncrease:'',
         });

        //Populate Down Payment Percentage
        this.calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe(value=>{
                var val = this._rentalCalculatorService.generateDownPaymentPercent(
                        this.calcForm.get('li_purchasePrice').value,
                        this.calcForm.get('bl_downPaymentDollar').value
                );
                if(val !=  this.calcForm.get('bl_downPaymentPercent').value){
                    this.calcForm.patchValue({bl_downPaymentPercent : val});
                }
            }
        )

        //Populate Down Payment Dollar Amount
        this.calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe(value=>{
                var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                        this.calcForm.get('li_purchasePrice').value,
                        this.calcForm.get('bl_downPaymentPercent').value
                );
                //If the value changed
                if(val !=  this.calcForm.get('bl_downPaymentDollar').value){
                     this.calcForm.patchValue({bl_downPaymentDollar : val});
                }
            }
        )
        //Populate Down Payment Dollar Amount & Percentage Amount
        this.calcForm.get('li_purchasePrice').valueChanges
            .subscribe(value=>{
                var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                        this.calcForm.get('li_purchasePrice').value,
                        this.calcForm.get('bl_downPaymentPercent').value
                );
                //If the value changed
                if(val !=  this.calcForm.get('bl_downPaymentDollar').value){
                     this.calcForm.patchValue({bl_downPaymentDollar : val});
                }
            }
        )
        //Populate management fee dollar amount
        // this.calcForm.get('units').get('ri_grossMonthlyIncome').valueChanges
        //     .subscribe(value=>{
        //         var val =  this._rentalCalculatorService.generateManagementFeeDollarAmount(
        //                 "income",
        //                 this.calcForm
        //         );
        //         //If the value changed
        //         // if(val !=  this.calcForm.get('bl_downPaymentDollar').value){
        //         //      this.calcForm.patchValue({bl_downPaymentDollar : val});
        //         // }
        //     }
        // )
        //Populate management fee dollar amount
        this.calcForm.get('m_costPercent').valueChanges
            .subscribe(value=>{
                var val =  this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "managementPercent",
                        this.calcForm.controls
                );
                //If the value changed
                // if(val !=  this.calcForm.get('bl_downPaymentDollar').value){
                //      this.calcForm.patchValue({bl_downPaymentDollar : val});
                // }
            }
        )
     } 
}