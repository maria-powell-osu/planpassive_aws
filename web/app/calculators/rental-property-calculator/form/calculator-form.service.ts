import { Injectable } from "@angular/core";
import { FormGroup , FormBuilder, FormControl, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import { RentalCalculatorService } from '../rental-property-calculator.service';

@Injectable()
export class CalculatorFormService {
    calcForm : FormGroup;

    constructor (private fb :FormBuilder, private _rentalCalculatorService : RentalCalculatorService){
        
         this.calcForm = this.fb.group({     
            loanInfoView :  'bankLoan',
            advancedOptions: false,
            li_purchasePrice : ['', [Validators.required]],
            li_purchaseDate : [this._rentalCalculatorService.getCurrentDate(), [Validators.required]],  //date needs to get validated for format
            bl_loanName : '',
            bl_closingCost : '',
            bl_interest : ['', [Validators.required]],
            bl_amortization : ['', [Validators.required]],
            bl_downPaymentDollar : ['', [Validators.required]],
            bl_downPaymentPercent : ['', [Validators.required]],
            bl_extraPrincipal : '',
            bl_startDate : '',
            bl_endDate : '',
            loans : this.fb.array([]),
            specialTermsLoans : this.fb.array([]),
            units : this.fb.array([this.buildUnit() ]),
            supplementalIncomes : this.fb.array([]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities : this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: 10,
            o_insurance: '',
            m_costAmount: '',
            expenses : this.fb.array([]),
            capitalExpenditures: this.fb.array([]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: 3,
            o_vacancyRate: 5,
            ri_annualRentIncrease: 3,
            e_annualExpenseIncrease:3,
            userClickedResults : false,  
            purchasePriceError: false,
            cashFlowProjectionTableData : '',
            cashFlowProjectionChart : '',
            cashFlowSummary : '',
            incomePieChart : '',
            expensePieChart : '',
            cashOnEquityTable : '',
            cashOnEquityChart : '',
            totalReturnTable : '',
            totalReturnStackedBarChart : '',
            totalReturnSummary : '',
            summaryData : 'yy'
         });

    }

    private loanForm() : FormGroup {
        return new FormBuilder().group({ 
                add_bl_loanName : '',
                add_bl_loanAmount : ['', [Validators.required]],
                add_bl_interest : [false, [Validators.required]],
                add_bl_amortization : ['', [Validators.required]],
                add_bl_balloon : '',
                add_bl_upFrontLenderPoints : '',
                add_bl_interestOnly : ''
            });
    }
    private specialTermsLoanForm() : FormGroup {
        return new FormBuilder().group({
            stl_loanName : '',
            stl_amount : ['', [Validators.required]],
            stl_interest : [false, [Validators.required]],
            stl_amortization : ['', [Validators.required]],
            stl_balloon : '',
            stl_upFrontLenderPoints : '',
            stl_interestOption : ''
         });
    }
    private unitForm() : FormGroup {
         return new FormBuilder().group({
            ri_grossMonthlyIncome : ['', [Validators.required]],
            ri_unitName : ''
         });
    }

    private supplementalIncomeForm() : FormGroup {
        return new FormBuilder().group({
            si_description : ['', [Validators.required]],
            si_grossMonthlyIncome : ['', [Validators.required]]
         });
    }
    
    private utilityForm() : FormGroup{
        return new FormBuilder().group({
             add_u_name: ['', [Validators.required]],
             add_u_amount: ['', [Validators.required]]
         });
    }
    
    private expenseForm() : FormGroup{
        return new FormBuilder().group({
             add_e_name: ['', [Validators.required]],
             add_e_cost: ['', [Validators.required]]
         });
    }

   private capexForm() : FormGroup {
       return new FormBuilder().group({
            ce_description: ['Rehab', [Validators.required]],
             ce_cost: ['', [Validators.required]],
             ce_date: [this._rentalCalculatorService.getCurrentDate(), [Validators.required]]
         });
    }

    buildLoan(){return this.loanForm();}

    buildSpecialTermsLoan(){return this.specialTermsLoanForm();}

    buildUnit(){return this.unitForm();}

    buildSupplementalIncome(){return this.supplementalIncomeForm();}

    buildUtility(){return this.utilityForm();}

    buildExpense(){return this.expenseForm();}

    buildCapitalExpenditure(){return this.capexForm();}

    //TODO: the handler should not use customer error - implement with update validation rule
            //the downpayment should be able to be set to 0
    addEventListeners(calcForm: any){
        //Populate Down Payment Percentage - when user enter down paymanet dollar
        calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe((value:any)=>{
                //check to see if the purchase price has even been set
                if(!calcForm.get('li_purchasePrice').value){

                    //if purchase price and dollar was set, then add error to it
                    calcForm.patchValue({purchasePriceError :true});
                    
                    //to make sure we do not get into infinite change value loop
                    if(calcForm.get('bl_downPaymentDollar').value){
                        //if purchase price not set, reset the value
                         calcForm.patchValue({bl_downPaymentDollar :undefined});
                    }
                } else {
                    var val = this._rentalCalculatorService.generateDownPaymentPercent(
                            calcForm.get('li_purchasePrice').value,
                            calcForm.get('bl_downPaymentDollar').value
                    );
                    if(val !=  calcForm.get('bl_downPaymentPercent').value){
                        calcForm.patchValue({bl_downPaymentPercent : val});
                }
                }
            });

        //Populate Down Payment Dollar Amount
        calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe((value:any)=>{
                //check to see if the purchase price has even been set
                if(!calcForm.get('li_purchasePrice').value){
                    //delete user input since it is not valid
                    calcForm.patchValue({purchasePriceError :true});

                    //to make sure we do not get into infinite change value loop
                    if(calcForm.get('bl_downPaymentPercent').value){
                        //if purchase price not set, reset the value
                         calcForm.patchValue({bl_downPaymentPercent :undefined});
                    }
                } else {
                    var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                            calcForm.get('li_purchasePrice').value,
                            calcForm.get('bl_downPaymentPercent').value
                    );
                    //If the value changed
                    if(val !=  calcForm.get('bl_downPaymentDollar').value){
                        calcForm.patchValue({bl_downPaymentDollar : val});
                    }
                }
            });
        //Populate Down Payment Dollar Amount & Percentage Amount
        calcForm.get('li_purchasePrice').valueChanges
            .subscribe((value:any)=>{
                if(calcForm.get('li_purchasePrice').value){
                    //delete user input since it is not valid
                    calcForm.patchValue({purchasePriceError :false});
                 } 
                var val =  this._rentalCalculatorService.generateDownPaymentDollarAmount(
                        calcForm.get('li_purchasePrice').value,
                        calcForm.get('bl_downPaymentPercent').value
                );
                //If the value changed
                if(val !=  calcForm.get('bl_downPaymentDollar').value){
                    calcForm.patchValue({bl_downPaymentDollar : val});
                }
               
            });
        //when user changes income portion, update management fee dollar amount
        calcForm.get('units').valueChanges
            .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "income",
                        calcForm,
                );
            });
        
        //when user changes manager percent, update dollar amount
        calcForm.get('pm_managementFeePercent').valueChanges
           .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "managementPercent",
                        calcForm,
                );
            });
        //when user udpates maitenance cost percent, update the management dollar amount
        calcForm.get('m_costPercent').valueChanges
           .subscribe((value:any)=>{
                this._rentalCalculatorService.generateManagementFeeDollarAmount(
                        "maintenancePercent",
                        calcForm,
                );
            });

        //when user updates the principal field, start and end date are required
        calcForm.get('bl_extraPrincipal').valueChanges
            .subscribe((value:any)=>{
                if(value){
                    //if value, Add validators for the fields
                    calcForm.get('bl_startDate').setValidators(Validators.required);
                    calcForm.get('bl_startDate').updateValueAndValidity();
                    calcForm.get('bl_endDate').setValidators(Validators.required);
                    calcForm.get('bl_endDate').updateValueAndValidity();
                } else {
                    //if no value, remove validators for the fields
                    calcForm.get('bl_startDate').setValidators();
                    calcForm.get('bl_startDate').updateValueAndValidity();
                    calcForm.get('bl_endDate').setValidators();
                    calcForm.get('bl_endDate').updateValueAndValidity();
                }
            });

        //Adjust Validators depending on which loan type is selected
        calcForm.get('loanInfoView').valueChanges
            .subscribe((value:any)=>{
                if(value == 'bankLoan'){
                    //make sure there is no special terms loans in the form
                     //reset the form
                    calcForm.controls['specialTermsLoans'] =  this.fb.array([]);
                    
                    //add the validation for a bank loan
                    calcForm.get('bl_interest').setValidators(Validators.required);
                    calcForm.get('bl_interest').updateValueAndValidity();

                    calcForm.get('bl_amortization').setValidators(Validators.required);
                    calcForm.get('bl_amortization').updateValueAndValidity();

                    calcForm.get('bl_downPaymentDollar').setValidators(Validators.required);
                    calcForm.get('bl_downPaymentDollar').updateValueAndValidity();

                    calcForm.get('bl_downPaymentPercent').setValidators(Validators.required);
                    calcForm.get('bl_downPaymentPercent').updateValueAndValidity();

                }else if(value == 'specialTermsLoan'){
                    //reset the form
                    calcForm.controls['specialTermsLoans'] = this.fb.array([this.buildSpecialTermsLoan()]);

                     //reset the loan aray
                    calcForm.controls['loans'] = this.fb.array([]);

                     //make sure all bank loan validators are removed
                    calcForm.get('bl_interest').setValidators();
                    calcForm.get('bl_interest').updateValueAndValidity();

                    calcForm.get('bl_amortization').setValidators();
                    calcForm.get('bl_amortization').updateValueAndValidity();

                    calcForm.get('bl_downPaymentDollar').setValidators();
                    calcForm.get('bl_downPaymentDollar').updateValueAndValidity();

                    calcForm.get('bl_downPaymentPercent').setValidators();
                    calcForm.get('bl_downPaymentPercent').updateValueAndValidity();

                    calcForm.get('bl_startDate').setValidators();
                    calcForm.get('bl_startDate').updateValueAndValidity();
                    calcForm.get('bl_endDate').setValidators();
                    calcForm.get('bl_endDate').updateValueAndValidity();
                }else if(value == 'cash'){
                    //reset the form
                    calcForm.controls['specialTermsLoans'] = this.fb.array([]);

                      //reset the loan aray
                    calcForm.controls['loans'] = this.fb.array([]);

                     //make sure all bank loan validators are removed
                    calcForm.get('bl_interest').setValidators();
                    calcForm.get('bl_interest').updateValueAndValidity();

                    calcForm.get('bl_amortization').setValidators();
                    calcForm.get('bl_amortization').updateValueAndValidity();

                    calcForm.get('bl_downPaymentDollar').setValidators();
                    calcForm.get('bl_downPaymentDollar').updateValueAndValidity();

                    calcForm.get('bl_downPaymentPercent').setValidators();
                    calcForm.get('bl_downPaymentPercent').updateValueAndValidity();

                    calcForm.get('bl_startDate').setValidators();
                    calcForm.get('bl_startDate').updateValueAndValidity();
                    calcForm.get('bl_endDate').setValidators();
                    calcForm.get('bl_endDate').updateValueAndValidity()

                }

            });
    }

}