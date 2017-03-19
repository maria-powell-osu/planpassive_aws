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
var calculator_form_service_1 = require("../../form/calculator-form.service");
var CashFlowComponent = (function () {
    function CashFlowComponent(_rentalCalculatorService, _calculatorFormService) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this._calculatorFormService = _calculatorFormService;
    }
    Object.defineProperty(CashFlowComponent.prototype, "units", {
        get: function () {
            return this.calcForm.get('units');
        },
        enumerable: true,
        configurable: true
    });
    CashFlowComponent.prototype.addUnit = function () {
        this.units.push(this._calculatorFormService.buildUnit());
    };
    CashFlowComponent.prototype.removeUnit = function () {
        this.units.removeAt(this.units.length - 1);
    };
    Object.defineProperty(CashFlowComponent.prototype, "supplementalIncomes", {
        get: function () {
            return this.calcForm.get('supplementalIncomes');
        },
        enumerable: true,
        configurable: true
    });
    CashFlowComponent.prototype.addSupplementalIncome = function () {
        this.supplementalIncomes.push(this._calculatorFormService.buildSupplementalIncome());
    };
    CashFlowComponent.prototype.removeSupplementalIncome = function () {
        this.supplementalIncomes.removeAt(this.supplementalIncomes.length - 1);
    };
    Object.defineProperty(CashFlowComponent.prototype, "utilities", {
        get: function () {
            return this.calcForm.get('utilities');
        },
        enumerable: true,
        configurable: true
    });
    CashFlowComponent.prototype.addUtility = function () {
        this.utilities.push(this._calculatorFormService.buildUtility());
    };
    CashFlowComponent.prototype.removeUtility = function () {
        this.utilities.removeAt(this.utilities.length - 1);
    };
    Object.defineProperty(CashFlowComponent.prototype, "expenses", {
        get: function () {
            return this.calcForm.get('expenses');
        },
        enumerable: true,
        configurable: true
    });
    CashFlowComponent.prototype.addExpense = function () {
        this.expenses.push(this._calculatorFormService.buildExpense());
    };
    CashFlowComponent.prototype.removeExpense = function () {
        this.expenses.removeAt(this.expenses.length - 1);
    };
    Object.defineProperty(CashFlowComponent.prototype, "capitalExpenditures", {
        get: function () {
            return this.calcForm.get('capitalExpenditures');
        },
        enumerable: true,
        configurable: true
    });
    CashFlowComponent.prototype.addCapitalExpenditure = function () {
        this.capitalExpenditures.push(this._calculatorFormService.buildCapitalExpenditure());
    };
    CashFlowComponent.prototype.removeCapitalExpenditure = function () {
        this.capitalExpenditures.removeAt(this.capitalExpenditures.length - 1);
    };
    return CashFlowComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], CashFlowComponent.prototype, "calcForm", void 0);
CashFlowComponent = __decorate([
    core_1.Component({
        templateUrl: "app/calculators/rental-property-calculator/views/cashflow/cashflow.component.html",
        selector: 'cashflow',
        providers: [rental_property_calculator_service_1.RentalCalculatorService, calculator_form_service_1.CalculatorFormService]
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService,
        calculator_form_service_1.CalculatorFormService])
], CashFlowComponent);
exports.CashFlowComponent = CashFlowComponent;
//# sourceMappingURL=cashflow.component.js.map