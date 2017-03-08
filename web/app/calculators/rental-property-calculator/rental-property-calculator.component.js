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
var rental_property_calculator_service_1 = require("./rental-property-calculator.service");
var RentalPropertyCalculatorComponent = (function () {
    function RentalPropertyCalculatorComponent(_rentalCalculatorService) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this.input = {};
    }
    RentalPropertyCalculatorComponent.prototype.calculate = function (form) {
        if (form.$valid) {
            //Get the data for the tables, graphs etc.
            var results = this._rentalCalculatorService.calculateResults(this.input);
            //Whenever we calculate new tables, I am resetting the tabs to show graph first
            //the reason why I added this is because the sizing gets messed up when they are hidden as they get drawn
            this.cashFlowView = 'graph';
            this.cashOnEquityView = 'graph';
            this.totalReturnView = 'graph';
            //A watch has been added in the mp-charts directive that triggers drawing of the graphs
            this.chartData = results;
        }
        else {
            //Generate list of missing fields
            this.missingFields = [];
            for (var i = 0; i < form.$error.required.length; i++) {
                this.userWantedToViewResults = true;
                this.missingFields.push(form.$error.required[i].$name);
            }
        }
    };
    RentalPropertyCalculatorComponent.prototype.ngOnInit = function () {
        this.loading = false;
        this.view = "loan";
        this.cashFlowView = 'graph';
        this.cashOnEquityView = 'graph';
        this.totalReturnView = 'graph';
    };
    return RentalPropertyCalculatorComponent;
}());
RentalPropertyCalculatorComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
        providers: [rental_property_calculator_service_1.RentalCalculatorService]
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService])
], RentalPropertyCalculatorComponent);
exports.RentalPropertyCalculatorComponent = RentalPropertyCalculatorComponent;
//# sourceMappingURL=rental-property-calculator.component.js.map