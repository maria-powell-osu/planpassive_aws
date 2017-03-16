import { Injectable } from "@angular/core";
import { FormGroup , FormBuilder, FormControl} from '@angular/forms';
import { RentalCalculatorService } from './rental-property-calculator.service';

@Injectable()
export class CalculatorFormService {
    calcForm : FormGroup;

    constructor (private fb :FormBuilder, private _rentalCalculatorService : RentalCalculatorService){
        
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
            loans : this.fb.array([ this.buildLoan() ]),
            specialTermsLoans : this.fb.array([ this.buildSpecialTermsLoan() ]),
            units : this.fb.array([this.buildUnit() ]),
            supplementalIncomes : this.fb.array([this.buildSupplementalIncome()]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities : this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: 10,
            o_insurance: '',
            m_costAmount: '',
            expenses : this.fb.array([]),
            capitalExpenditures: this.fb.array([ this.buildCapitalExpenditure() ]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: 3,
            o_vacancyRate: 5,
            ri_annualRentIncrease: 3,
            e_annualExpenseIncrease:3
         });

    }

    buildLoan(){return this.loanForm();}

    buildSpecialTermsLoan(){return this.specialTermsLoanForm();}

    buildUnit(){return this.unitForm();}

    buildSupplementalIncome(){return this.supplementalIncomeForm();}

    buildUtility(){return this.utilityForm();}

    buildExpense(){return this.expenseForm();}

    buildCapitalExpenditure(){return this.capexForm();}

    private loanForm() : FormGroup {
     return new FormBuilder().group({ 
            add_bl_loanName : '',
            add_bl_loanAmount : '',
            add_bl_interest : false,
            add_bl_amortization : '',
            add_bl_balloon : '',
            add_bl_upFrontLenderPoints : '',
            add_bl_interestOnly : ''
         });
    }
    private specialTermsLoanForm() : FormGroup {
        return new FormBuilder().group({
            stl_loanName : '',
            stl_amount : '',
            stl_interest : false,
            stl_amortization : '',
            stl_balloon : '',
            stl_upFrontLenderPoints : '',
            stl_interestOption : ''
         });
    }
    private unitForm() : FormGroup {
         return new FormBuilder().group({
            ri_grossMonthlyIncome : '',
            ri_unitName : ''
         });
    }

    private supplementalIncomeForm() : FormGroup {
        return new FormBuilder().group({
             si_description : '',
            si_grossMonthlyIncome : ''
         });
    }
    
    private utilityForm() : FormGroup{
        return new FormBuilder().group({
              add_u_name: '',
             add_u_amount: ''
         });
    }
    
    private expenseForm() : FormGroup{
        return new FormBuilder().group({
             add_e_name: '',
             add_e_cost: ''
         });
    }

   private capexForm() : FormGroup {
       return new FormBuilder().group({
            ce_description: 'Rehab',
             ce_cost: '',
             ce_date: this._rentalCalculatorService.getCurrentDate()
         });
    }

    addEventListeners(calcForm: any){
        //Populate Down Payment Percentage
        calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe((value:any)=>{
                var val = this._rentalCalculatorService.generateDownPaymentPercent(
                        calcForm.get('li_purchasePrice').value,
                        calcForm.get('bl_downPaymentDollar').value
                );
                if(val !=  calcForm.get('bl_downPaymentPercent').value){
                    calcForm.patchValue({bl_downPaymentPercent : val});
                }
            });

        //Populate Down Payment Dollar Amount
        calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe((value:any)=>{
                var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                        calcForm.get('li_purchasePrice').value,
                        calcForm.get('bl_downPaymentPercent').value
                );
                //If the value changed
                if(val !=  calcForm.get('bl_downPaymentDollar').value){
                     calcForm.patchValue({bl_downPaymentDollar : val});
                }
            });
        //Populate Down Payment Dollar Amount & Percentage Amount
        calcForm.get('li_purchasePrice').valueChanges
            .subscribe((value:any)=>{
                var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                        calcForm.get('li_purchasePrice').value,
                        calcForm.get('bl_downPaymentPercent').value
                );
                //If the value changed
                if(val !=  calcForm.get('bl_downPaymentDollar').value){
                     calcForm.patchValue({bl_downPaymentDollar : val});
                }
            });
        calcForm.get('units').valueChanges
            .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "income",
                        calcForm,
                );
            });

        calcForm.get('pm_managementFeePercent').valueChanges
           .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "managementPercent",
                        calcForm,
                );
            });
        calcForm.get('m_costPercent').valueChanges
           .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "maintenancePercent",
                        calcForm,
                );
            });
    }

}