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
var RentalPropertyCalculatorComponent = (function () {
    function RentalPropertyCalculatorComponent(_rentalCalculatorService, fb) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this.fb = fb;
    }
    RentalPropertyCalculatorComponent.prototype.calculate = function (form) {
    };
    RentalPropertyCalculatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.view = 'loan';
        this.loading = false;
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
            loans: this.fb.array([this._rentalCalculatorService.buildLoan()]),
            specialTermsLoans: this.fb.array([this._rentalCalculatorService.buildSpecialTermsLoan()]),
            units: this.fb.array([this._rentalCalculatorService.buildUnit()]),
            supplementalIncomes: this.fb.array([this._rentalCalculatorService.buildSupplementalIncome()]),
            u_garbage: '',
            u_water: '',
            o_yardMaintenance: '',
            utilities: this.fb.array([]),
            o_propertyTaxes: '',
            m_costPercent: '',
            o_insurance: '',
            m_costAmount: '',
            expenses: this.fb.array([]),
            capitalExpenditures: this.fb.array([this._rentalCalculatorService.buildCapitalExpenditure()]),
            e_arv: '',
            pm_tenantPlacementFee: '',
            pm_managementFeePercent: '',
            pm_managementFeeAmount: '',
            bp_assumedAppreciation: '',
            o_vacancyRate: '',
            ri_annualRentIncrease: '',
            e_annualExpenseIncrease: '',
        });
        //Populate Down Payment Percentage
        this.calcForm.get('bl_downPaymentDollar').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentPercent(_this.calcForm.get('li_purchasePrice').value, _this.calcForm.get('bl_downPaymentDollar').value);
            if (val != _this.calcForm.get('bl_downPaymentPercent').value) {
                _this.calcForm.patchValue({ bl_downPaymentPercent: val });
            }
        });
        //Populate Down Payment Dollar Amount
        this.calcForm.get('bl_downPaymentPercent').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(_this.calcForm.get('li_purchasePrice').value, _this.calcForm.get('bl_downPaymentPercent').value);
            //If the value changed
            if (val != _this.calcForm.get('bl_downPaymentDollar').value) {
                _this.calcForm.patchValue({ bl_downPaymentDollar: val });
            }
        });
        //Populate Down Payment Dollar Amount & Percentage Amount
        this.calcForm.get('li_purchasePrice').valueChanges
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateDownPaymentDollarAmount(_this.calcForm.get('li_purchasePrice').value, _this.calcForm.get('bl_downPaymentPercent').value);
            //If the value changed
            if (val != _this.calcForm.get('bl_downPaymentDollar').value) {
                _this.calcForm.patchValue({ bl_downPaymentDollar: val });
            }
        });
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
            .subscribe(function (value) {
            var val = _this._rentalCalculatorService.generateManagementFeeDollarAmount("managementPercent", _this.calcForm.controls);
            //If the value changed
            // if(val !=  this.calcForm.get('bl_downPaymentDollar').value){
            //      this.calcForm.patchValue({bl_downPaymentDollar : val});
            // }
        });
    };
    return RentalPropertyCalculatorComponent;
}());
RentalPropertyCalculatorComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
        providers: [rental_property_calculator_service_1.RentalCalculatorService]
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService,
        forms_1.FormBuilder])
], RentalPropertyCalculatorComponent);
exports.RentalPropertyCalculatorComponent = RentalPropertyCalculatorComponent;
//# sourceMappingURL=rental-property-calculator.component.js.map