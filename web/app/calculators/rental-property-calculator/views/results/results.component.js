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
var rental_property_calculator_service_1 = require("../../rental-property-calculator.service");
var ResultsComponent = (function () {
    function ResultsComponent(_rentalCalculatorService, _crd) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this._crd = _crd;
        this.cashFlowTableLoading = false;
        this.cashFlowChartLoading = false;
        this.totalReturnChartLoading = false;
        this.totalReturnTableLoading = false;
        this.cashOnEquityChartLoading = false;
        this.cashOnEquityTableLoading = false;
        this.pieChartLoading = false;
        this.cashFlowView = 'graph';
        this.totalReturnView = 'graph';
        this.cashOnEquityView = 'graph';
    }
    ResultsComponent.prototype.ngAfterViewInit = function () {
        //setting this to true, highlights missing fields now in form
        this.calcForm.patchValue({ 'userClickedResults': true });
        //Only run calculation if the required inputs are there and valid
        if (this.calcForm.valid) {
            this.calcForm;
            this.resultData = this._rentalCalculatorService.calculateResults(this.calcForm);
            if (this.resultData) {
                //watchers have been added for those used in charts to draw up the graphs
                this.calcForm.patchValue({ 'summaryData': this.resultData.summaryData });
                this.calcForm.patchValue({ 'cashFlowProjectionTableData': this.resultData.cashFlowProjectionTable });
                this.calcForm.patchValue({ 'cashFlowProjectionChart': this.resultData.cashFlowProjectionChart });
                this.calcForm.patchValue({ 'cashFlowSummary': this.resultData.cashFlowSummary });
                this.calcForm.patchValue({ 'incomePieChart': this.resultData.incomePieChart });
                this.calcForm.patchValue({ 'expensePieChart': this.resultData.expensePieChart });
                this.calcForm.patchValue({ 'cashOnEquityTable': this.resultData.cashOnEquityTable });
                this.calcForm.patchValue({ 'cashOnEquityChart': this.resultData.cashOnEquityChart });
                this.calcForm.patchValue({ 'totalReturnTable': this.resultData.totalReturnTable });
                this.calcForm.patchValue({ 'totalReturnStackedBarChart': this.resultData.totalReturnStackedBarChart });
                this.calcForm.patchValue({ 'totalReturnSummary': this.resultData.totalReturnSummary });
                //since we are in ngAfterViewInit which loads after view is loaded, we tell Angular to check the values again
                //without this view will not load
                this._crd.detectChanges();
            }
        }
    };
    return ResultsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], ResultsComponent.prototype, "calcForm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ResultsComponent.prototype, "resultData", void 0);
ResultsComponent = __decorate([
    core_1.Component({
        templateUrl: "app/calculators/rental-property-calculator/views/results/results.component.html",
        selector: 'result'
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService, core_1.ChangeDetectorRef])
], ResultsComponent);
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=results.component.js.map