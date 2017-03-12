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
        this.view = 'loan';
        this.loading = false;
        this.calcForm = this.fb.group({
            loanInfoView: 'bankLoan',
            li_purchasePrice: '',
            li_purchaseDate: this.getCurrentDate(),
            bl_loanName: '',
            bl_closingCost: '',
            bl_interest: '',
            bl_amortization: '',
            bl_downPaymentDollar: '',
            bl_downPaymentPercent: '',
            bl_extraPrincipal: '',
            bl_startDate: '',
            bl_endDate: ''
        });
    };
    RentalPropertyCalculatorComponent.prototype.getCurrentDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = mm + '/' + dd + '/' + yyyy;
        return result;
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