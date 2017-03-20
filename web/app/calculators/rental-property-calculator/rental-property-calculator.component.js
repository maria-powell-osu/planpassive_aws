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
var calculator_form_service_1 = require("./form/calculator-form.service");
var RentalPropertyCalculatorComponent = (function () {
    function RentalPropertyCalculatorComponent(_rentalCalculatorService, fb, _calculatorFormService) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this.fb = fb;
        this._calculatorFormService = _calculatorFormService;
    }
    RentalPropertyCalculatorComponent.prototype.calculate = function (form) {
        //setting this to true, highlights missing fields now in form
        this.calcForm.patchValue({ 'userClickedResults': true });
        //Only run calculation if the required inputs are there and valid
        if (this.calcForm.valid) {
            this.resultData = this._rentalCalculatorService.calculateResults(this.calcForm);
            //Whenever we calculate new tables, I am resetting the tabs to show graph first
            //the reason why I added this is because the sizing gets messed up when they are hidden as they get drawn
            //vm.cashFlowView = 'graph';
            //vm.cashOnEquityView = 'graph';
            //vm.totalReturnView = 'graph';
            //A watch has been added in the mp-charts directive that triggers drawing of the graphs
            //vm.chartData = results;
        }
    };
    RentalPropertyCalculatorComponent.prototype.ngOnInit = function () {
        this.view = 'loan';
        this.loading = false;
        this.calcForm = this._calculatorFormService.calcForm;
        this._calculatorFormService.addEventListeners(this.calcForm);
    };
    return RentalPropertyCalculatorComponent;
}());
RentalPropertyCalculatorComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
        providers: [rental_property_calculator_service_1.RentalCalculatorService, calculator_form_service_1.CalculatorFormService]
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService,
        forms_1.FormBuilder,
        calculator_form_service_1.CalculatorFormService])
], RentalPropertyCalculatorComponent);
exports.RentalPropertyCalculatorComponent = RentalPropertyCalculatorComponent;
//# sourceMappingURL=rental-property-calculator.component.js.map