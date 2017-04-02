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
var investment_return_calculator_service_1 = require("./investment-return-calculator.service");
var InvestmentReturnCalculatorComponent = (function () {
    function InvestmentReturnCalculatorComponent(_fb, _investmentCalculatorService, _crd) {
        this._fb = _fb;
        this._investmentCalculatorService = _investmentCalculatorService;
        this._crd = _crd;
        this.userClickedCalculate = false;
        this.chartView = 'barGraph';
        this.futureValueStackColumnChartLoading = false;
        this.futureValuePieChartLoading = false;
        this.result = {};
        this.calcForm = this._fb.group({
            investAmount: ['', [forms_1.Validators.required]],
            monthlyContributions: ['', [forms_1.Validators.required]],
            annualRateOfReturn: ['', [forms_1.Validators.required]],
            years: ['', [forms_1.Validators.required]],
            yearsBeforeContributing: '',
            futureValuePieChartData: '',
            futureValueStackedBarChartData: ''
        });
    }
    InvestmentReturnCalculatorComponent.prototype.calculate = function () {
        this.userClickedCalculate = true;
        if (this.calcForm.valid) {
            this.result = this._investmentCalculatorService.calculateResults(this.calcForm);
            if (this.result) {
                //watchers have been added for those used in charts to draw up the graphs
                this.calcForm.patchValue({ 'futureValueStackedBarChartData': this.result.dataForVisuals.futureValueChart });
                this.calcForm.patchValue({ 'futureValuePieChartData': this.result.dataForVisuals.futureValuePieChart });
                //since we are in ngAfterViewInit which loads after view is loaded, we tell Angular to check the values again
                //without this view will not load
                this._crd.detectChanges();
            }
        }
    };
    return InvestmentReturnCalculatorComponent;
}());
InvestmentReturnCalculatorComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/calculators/investment-return-calculator/investment-return-calculator.component.html',
        providers: [investment_return_calculator_service_1.InvestmentCalculatorService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        investment_return_calculator_service_1.InvestmentCalculatorService,
        core_1.ChangeDetectorRef])
], InvestmentReturnCalculatorComponent);
exports.InvestmentReturnCalculatorComponent = InvestmentReturnCalculatorComponent;
//# sourceMappingURL=investment-return-calculator.component.js.map