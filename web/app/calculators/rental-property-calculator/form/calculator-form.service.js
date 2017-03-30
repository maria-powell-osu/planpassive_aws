"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rental_property_calculator_service_1 = require("../rental-property-calculator.service");
var CalculatorFormService = (function () {
    function CalculatorFormService(fb, _rentalCalculatorService) {
        this.fb = fb;
        this._rentalCalculatorService = _rentalCalculatorService;
        this.calcForm = this.fb.group({
            loanInfoView: 'bankLoan',
            advancedOptions: false,
            li_purchasePrice: ['', [forms_1.Validators.required]],
            li_purchaseDate: [this._rentalCalculatorService.getCurrentDate(), [forms_1.Validators.required]],
            bl_loanName: '',
            bl_closingCost: '',
            bl_interest: ['', [forms_1.Validators.required]],
            bl_amortization: ['', [forms_1.Validators.required]],
            bl_downPaymentDollar: ['', [forms_1.Validators.required]],
            bl_downPaymentPercent: ['', [forms_1.Validators.required]],
            bl_extraPrincipal: '',
            bl_startDate: '',
            bl_endDate: '',
            loans: this.fb.array([]),
            specialTermsLoans: this.fb.array([]),
            units: this.fb.array([this.buildUnit()]),
            supplementalIncomes: this.fb.array([]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities: this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: 10,
            o_insurance: '',
            m_costAmount: '',
            expenses: this.fb.array([]),
            capitalExpenditures: this.fb.array([]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: 3,
            o_vacancyRate: 5,
            ri_annualRentIncrease: 3,
            e_annualExpenseIncrease: 3,
            userClickedResults: false,
            purchasePriceError: false,
            cashFlowProjectionTableData: '',
            cashFlowProjectionChart: '',
            cashFlowSummary: '',
            incomePieChart: '',
            expensePieChart: '',
            cashOnEquityTable: '',
            cashOnEquityChart: '',
            totalReturnTable: '',
            totalReturnStackedBarChart: '',
            totalReturnSummary: '',
            summaryData: 'yy'
        });
    }
    CalculatorFormService.prototype.loanForm = function () {
        return new forms_1.FormBuilder().group({
            add_bl_loanName: '',
            add_bl_loanAmount: ['', [forms_1.Validators.required]],
            add_bl_interest: [false, [forms_1.Validators.required]],
            add_bl_amortization: ['', [forms_1.Validators.required]],
            add_bl_balloon: '',
            add_bl_upFrontLenderPoints: '',
            add_bl_interestOnly: ''
        });
    };
    CalculatorFormService.prototype.specialTermsLoanForm = function () {
        return new forms_1.FormBuilder().group({
            stl_loanName: '',
            stl_amount: ['', [forms_1.Validators.required]],
            stl_interest: [false, [forms_1.Validators.required]],
            stl_amortization: ['', [forms_1.Validators.required]],
            stl_balloon: '',
            stl_upFrontLenderPoints: '',
            stl_interestOption: ''
        });
    };
    CalculatorFormService.prototype.unitForm = function () {
        return new forms_1.FormBuilder().group({
            ri_grossMonthlyIncome: ['', [forms_1.Validators.required]],
            ri_unitName: ''
        });
    };
    CalculatorFormService.prototype.supplementalIncomeForm = function () {
        return new forms_1.FormBuilder().group({
            si_description: ['', [forms_1.Validators.required]],
            si_grossMonthlyIncome: ['', [forms_1.Validators.required]]
        });
    };
    CalculatorFormService.prototype.utilityForm = function () {
        return new forms_1.FormBuilder().group({
            add_u_name: ['', [forms_1.Validators.required]],
            add_u_amount: ['', [forms_1.Validators.required]]
        });
    };
    CalculatorFormService.prototype.expenseForm = function () {
        return new forms_1.FormBuilder().group({
            add_e_name: ['', [forms_1.Validators.required]],
            add_e_cost: ['', [forms_1.Validators.required]]
        });
    };
    CalculatorFormService.prototype.capexForm = function () {
        return new forms_1.FormBuilder().group({
            ce_description: ['Rehab', [forms_1.Validators.required]],
            ce_cost: ['', [forms_1.Validators.required]],
            ce_date: [this._rentalCalculatorService.getCurrentDate(), [forms_1.Validators.required]]
        });
    };
    CalculatorFormService.prototype.buildLoan = function () { return this.loanForm(); };
    CalculatorFormService.prototype.buildSpecialTermsLoan = function () { return this.specialTermsLoanForm(); };
    CalculatorFormService.prototype.buildUnit = function () { return this.unitForm(); };
    CalculatorFormService.prototype.buildSupplementalIncome = function () { return this.supplementalIncomeForm(); };
    CalculatorFormService.prototype.buildUtility = function () { return this.utilityForm(); };
    CalculatorFormService.prototype.buildExpense = function () { return this.expenseForm(); };
    CalculatorFormService.prototype.buildCapitalExpenditure = function () { return this.capexForm(); };
    //TODO: the handler should not use customer error - implement with update validation rule
    //the downpayment should be able to be set to 0
    CalculatorFormService.prototype.addEventListeners = function (calcForm) {
        var _this = this;
        //Populate Down Payment Percentage - when user enter down paymanet dollar
        calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe(function (value) {
            //check to see if the purchase price has even been set
            if (!calcForm.get('li_purchasePrice').value) {
                //if purchase price and dollar was set, then add error to it
                calcForm.patchValue({ purchasePriceError: true });
                //to make sure we do not get into infinite change value loop
                if (calcForm.get('bl_downPaymentDollar').value) {
                    //if purchase price not set, reset the value
                    calcForm.patchValue({ bl_downPaymentDollar: undefined });
                }
            }
            else {
                var val = _this._rentalCalculatorService.generateDownPaymentPercent(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentDollar').value);
                if (val != calcForm.get('bl_downPaymentPercent').value) {
                    calcForm.patchValue({ bl_downPaymentPercent: val });
                }
            }
        });
        //Populate Down Payment Dollar Amount
        calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe(function (value) {
            //check to see if the purchase price has even been set
            if (!calcForm.get('li_purchasePrice').value) {
                //delete user input since it is not valid
                calcForm.patchValue({ purchasePriceError: true });
                //to make sure we do not get into infinite change value loop
                if (calcForm.get('bl_downPaymentPercent').value) {
                    //if purchase price not set, reset the value
                    calcForm.patchValue({ bl_downPaymentPercent: undefined });
                }
            }
            else {
                var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentPercent').value);
                //If the value changed
                if (val != calcForm.get('bl_downPaymentDollar').value) {
                    calcForm.patchValue({ bl_downPaymentDollar: val });
                }
            }
        });
        //Populate Down Payment Dollar Amount & Percentage Amount
        calcForm.get('li_purchasePrice').valueChanges
            .subscribe(function (value) {
            if (calcForm.get('li_purchasePrice').value) {
                //delete user input since it is not valid
                calcForm.patchValue({ purchasePriceError: false });
            }
            var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentPercent').value);
            //If the value changed
            if (val != calcForm.get('bl_downPaymentDollar').value) {
                calcForm.patchValue({ bl_downPaymentDollar: val });
            }
        });
        //when user changes income portion, update management fee dollar amount
        calcForm.get('units').valueChanges
            .subscribe(function (value) {
            _this._rentalCalculatorService.generateManagementFeeDollarAmount("income", calcForm);
        });
        //when user changes manager percent, update dollar amount
        calcForm.get('pm_managementFeePercent').valueChanges
            .subscribe(function (value) {
            _this._rentalCalculatorService.generateManagementFeeDollarAmount("managementPercent", calcForm);
        });
        //when user udpates maitenance cost percent, update the management dollar amount
        calcForm.get('m_costPercent').valueChanges
            .subscribe(function (value) {
            _this._rentalCalculatorService.generateManagementFeeDollarAmount("maintenancePercent", calcForm);
        });
        //when user updates the principal field, start and end date are required
        calcForm.get('bl_extraPrincipal').valueChanges
            .subscribe(function (value) {
            if (value) {
                //if value, Add validators for the fields
                calcForm.get('bl_startDate').setValidators(forms_1.Validators.required);
                calcForm.get('bl_startDate').updateValueAndValidity();
                calcForm.get('bl_endDate').setValidators(forms_1.Validators.required);
                calcForm.get('bl_endDate').updateValueAndValidity();
            }
            else {
                //if no value, remove validators for the fields
                calcForm.get('bl_startDate').setValidators();
                calcForm.get('bl_startDate').updateValueAndValidity();
                calcForm.get('bl_endDate').setValidators();
                calcForm.get('bl_endDate').updateValueAndValidity();
            }
        });
        //Adjust Validators depending on which loan type is selected
        calcForm.get('loanInfoView').valueChanges
            .subscribe(function (value) {
            if (value == 'bankLoan') {
                //make sure there is no special terms loans in the form
                //reset the form
                calcForm.controls['specialTermsLoans'] = _this.fb.array([]);
                //add the validation for a bank loan
                calcForm.get('bl_interest').setValidators(forms_1.Validators.required);
                calcForm.get('bl_interest').updateValueAndValidity();
                calcForm.get('bl_amortization').setValidators(forms_1.Validators.required);
                calcForm.get('bl_amortization').updateValueAndValidity();
                calcForm.get('bl_downPaymentDollar').setValidators(forms_1.Validators.required);
                calcForm.get('bl_downPaymentDollar').updateValueAndValidity();
                calcForm.get('bl_downPaymentPercent').setValidators(forms_1.Validators.required);
                calcForm.get('bl_downPaymentPercent').updateValueAndValidity();
            }
            else if (value == 'specialTermsLoan') {
                //reset the form
                calcForm.controls['specialTermsLoans'] = _this.fb.array([_this.buildSpecialTermsLoan()]);
                //reset the loan aray
                calcForm.controls['loans'] = _this.fb.array([]);
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
            }
            else if (value == 'cash') {
                //reset the form
                calcForm.controls['specialTermsLoans'] = _this.fb.array([]);
                //reset the loan aray
                calcForm.controls['loans'] = _this.fb.array([]);
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
            }
        });
    };
    return CalculatorFormService;
}());
CalculatorFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [forms_1.FormBuilder, rental_property_calculator_service_1.RentalCalculatorService])
], CalculatorFormService);
exports.CalculatorFormService = CalculatorFormService;
//# sourceMappingURL=calculator-form.service.js.map