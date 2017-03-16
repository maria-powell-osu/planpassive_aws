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
var rental_property_calculator_service_1 = require("./rental-property-calculator.service");
var CalculatorFormService = (function () {
    function CalculatorFormService(fb, _rentalCalculatorService) {
        this.fb = fb;
        this._rentalCalculatorService = _rentalCalculatorService;
        this.calcForm = this.fb.group({
            loanInfoView: 'bankLoan',
            li_purchasePrice: '',
            li_purchaseDate: this._rentalCalculatorService.getCurrentDate(),
            bl_loanName: '',
            bl_closingCost: '',
            bl_interest: '',
            bl_amortization: '',
            bl_downPaymentDollar: '',
            bl_downPaymentPercent: '',
            bl_extraPrincipal: '',
            bl_startDate: '',
            bl_endDate: '',
            loans: this.fb.array([this.buildLoan()]),
            specialTermsLoans: this.fb.array([this.buildSpecialTermsLoan()]),
            units: this.fb.array([this.buildUnit()]),
            supplementalIncomes: this.fb.array([this.buildSupplementalIncome()]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities: this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: 10,
            o_insurance: '',
            m_costAmount: '',
            expenses: this.fb.array([]),
            capitalExpenditures: this.fb.array([this.buildCapitalExpenditure()]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: 3,
            o_vacancyRate: 5,
            ri_annualRentIncrease: 3,
            e_annualExpenseIncrease: 3
        });
    }
    CalculatorFormService.prototype.buildLoan = function () { return this.loanForm(); };
    CalculatorFormService.prototype.buildSpecialTermsLoan = function () { return this.specialTermsLoanForm(); };
    CalculatorFormService.prototype.buildUnit = function () { return this.unitForm(); };
    CalculatorFormService.prototype.buildSupplementalIncome = function () { return this.supplementalIncomeForm(); };
    CalculatorFormService.prototype.buildUtility = function () { return this.utilityForm(); };
    CalculatorFormService.prototype.buildExpense = function () { return this.expenseForm(); };
    CalculatorFormService.prototype.buildCapitalExpenditure = function () { return this.capexForm(); };
    CalculatorFormService.prototype.loanForm = function () {
        return new forms_1.FormBuilder().group({
            add_bl_loanName: '',
            add_bl_loanAmount: '',
            add_bl_interest: false,
            add_bl_amortization: '',
            add_bl_balloon: '',
            add_bl_upFrontLenderPoints: '',
            add_bl_interestOnly: ''
        });
    };
    CalculatorFormService.prototype.specialTermsLoanForm = function () {
        return new forms_1.FormBuilder().group({
            stl_loanName: '',
            stl_amount: '',
            stl_interest: false,
            stl_amortization: '',
            stl_balloon: '',
            stl_upFrontLenderPoints: '',
            stl_interestOption: ''
        });
    };
    CalculatorFormService.prototype.unitForm = function () {
        return new forms_1.FormBuilder().group({
            ri_grossMonthlyIncome: '',
            ri_unitName: ''
        });
    };
    CalculatorFormService.prototype.supplementalIncomeForm = function () {
        return new forms_1.FormBuilder().group({
            si_description: '',
            si_grossMonthlyIncome: ''
        });
    };
    CalculatorFormService.prototype.utilityForm = function () {
        return new forms_1.FormBuilder().group({
            add_u_name: '',
            add_u_amount: ''
        });
    };
    CalculatorFormService.prototype.expenseForm = function () {
        return new forms_1.FormBuilder().group({
            add_e_name: '',
            add_e_cost: ''
        });
    };
    CalculatorFormService.prototype.capexForm = function () {
        return new forms_1.FormBuilder().group({
            ce_description: 'Rehab',
            ce_cost: '',
            ce_date: this._rentalCalculatorService.getCurrentDate()
        });
    };
    CalculatorFormService.prototype.addEventListeners = function (calcForm) {
        var _this = this;
        //Populate Down Payment Percentage
        calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentPercent(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentDollar').value);
            if (val != calcForm.get('bl_downPaymentPercent').value) {
                calcForm.patchValue({ bl_downPaymentPercent: val });
            }
        });
        //Populate Down Payment Dollar Amount
        calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentPercent').value);
            //If the value changed
            if (val != calcForm.get('bl_downPaymentDollar').value) {
                calcForm.patchValue({ bl_downPaymentDollar: val });
            }
        });
        //Populate Down Payment Dollar Amount & Percentage Amount
        calcForm.get('li_purchasePrice').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(calcForm.get('li_purchasePrice').value, calcForm.get('bl_downPaymentPercent').value);
            //If the value changed
            if (val != calcForm.get('bl_downPaymentDollar').value) {
                calcForm.patchValue({ bl_downPaymentDollar: val });
            }
        });
        calcForm.get('units').valueChanges
            .subscribe(function (value) {
            _this._rentalCalculatorService.generateManagementFeeDollarAmount("income", calcForm);
        });
        //Populate management fee dollar amount
        // for(var i = 0; i < calcForm.get('units').length; i++){
        //     this.addIncomeChangeEventListener(calcForm.get('units').at(i).get('ri_grossMonthlyIncome'), calcForm);
        // }
        //Populate management fee dollar amount
        // calcForm.get('m_costPercent').valueChanges
        //     .subscribe((value:any) =>{
        //         var val =  this._rentalCalculatorService.generateManagementFeeDollarAmount(
        //                 "maintenancePercent",
        //                 calcForm,
        //         );
        //     }
        // )
    };
    return CalculatorFormService;
}());
CalculatorFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [forms_1.FormBuilder, rental_property_calculator_service_1.RentalCalculatorService])
], CalculatorFormService);
exports.CalculatorFormService = CalculatorFormService;
//# sourceMappingURL=calculator-form.service.js.map