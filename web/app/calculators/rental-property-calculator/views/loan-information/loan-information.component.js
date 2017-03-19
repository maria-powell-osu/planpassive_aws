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
var LoanInformationComponent = (function () {
    function LoanInformationComponent(_rentalCalculatorService, _calculatorFormService) {
        this._rentalCalculatorService = _rentalCalculatorService;
        this._calculatorFormService = _calculatorFormService;
        //Tooltips Text
        this.amortizationText = "How many years is your loan for?"
            + "Residential loans are typically 30 or 15 years. "
            + "Commercial loans are typically 20 or 25 years.";
        this.preparedForText = "If you’re a real estate agent planning on sharing this "
            + "report with a client or an investor preparing this "
            + "for a partner or lender, this is where you put the "
            + "name of who you are generating this report for.";
        this.extraPrincipalText = "Are you planning to pay additional money every month towards your loan? "
            + "The “Start” and “End” fields allow you to enter a "
            + "specified time frame that you plan on making extra payments per month.";
        this.balloonDateText = "Some loans, like hard money loans";
        this.lenderPointsText = "Many hard money lenders and private lenders will charge "
            + "you fees immediately when you take the loan in addition "
            + "to interest over the life of the loan. The term “points” "
            + "is used, and one point equals 1% of the loan value. Using "
            + "a $100k loan as an example, if a hard money lender charges "
            + "2 points up front and 10% interest, you would owe the lender "
            + "$2,000 up front.";
        this.rentIncreaseText = "Rents typically go up over time. 3% is the national average.";
        this.expenseIncreaseText = "Expenses go up over time. 3% is a good average.";
        this.maitenanceText = "Things need to be replaced, repaired, and upgraded over "
            + "time. Typically, 10% of gross rents, 15% of gross rents for older "
            + "properties that require more upkeep.";
        this.vacancyText = "As tenants move out and new tenants move in, you will most likely "
            + "experience periods of time where you are unable to collect any "
            + "rental income. A commonly used vacancy rate is 5%";
        this.propTaxText = "What are the property taxes for an entire year? If you don’t "
            + "know, this information is almost always available on your "
            + "county assessor’s website, or websites like Zillow or Redfin.";
        this.capRateText = "The Cap rate (capitalization rate) is a financial measure used "
            + "to compare two or more commercial or multifamily properties. "
            + "The cap rate is one measure that allows us to compare two "
            + "unlike properties, like a 4 plex vs a 10 unit apartment "
            + "building for example. Cap rate is not a number that conveys "
            + "how much profit the investor is actually making, and most "
            + "experienced investors care far more about their cash on cash "
            + "return %.";
        this.appreciationText = "Property values go up over time. That’s one of the reasons "
            + "we invest in real estate! Put the average annual assumed "
            + "appreciation of your property here. A good average is 3%-3.5%.";
        this.desiredCashText = "Cash on cash return is the amount of dollars your property "
            + "generates that you actually get to spend every month, "
            + "expressed as a percentage based on the amount of dollars "
            + "you’ve had to put into the property. For example, if you "
            + "have to put $100k (not a loan, actual dollars from your "
            + "bank account) into a property for down payment, closing "
            + "costs, repairs, etc and the property generates $1,000 each "
            + "month after all expenses, mortgage, taxes, and everything "
            + "else, your cash on cash return would be 12% [($1k/month*12 "
            + "months)/$100,000] If you don’t know what to shoot for, 10% "
            + "is a good starting point, but this can vary wildly depending "
            + "on area.";
        this.tenantPlacementText = "In addition to a percentage of gross monthly rent, "
            + "property managers often charge a one time fee for "
            + "every time they place a new tenant in your property. "
            + "This is expressed in a dollar value, and is frequently "
            + "close to one month’s worth of rent for the unit they "
            + "rent out. Because we don’t always know when tenants will "
            + "move in and out, the dollar value you enter here will be "
            + "turned into a fixed monthly cost based on your vacancy rate "
            + "% when displayed in the results.";
        this.managementFeeText = "How much does your property manager charge each month to "
            + "manage the property? This number is typically expressed "
            + "as a percentage of gross monthly rents. Rates vary by "
            + "location, property time, and management company, but a "
            + "good range is typically between 7%-12%.";
        this.capitalExpendituresText = "Property improvements outside of regular maitenance.";
        this.arvText = "The price you pay for a property isn't always the same as what it's actually "
            + "worth. In this field, enter what you believe the property is actually worth. "
            + "If you are rehabbing, enter what you believe the property is worth after your "
            + "repairs.";
    }
    Object.defineProperty(LoanInformationComponent.prototype, "loans", {
        get: function () {
            return this.calcForm.get('loans');
        },
        enumerable: true,
        configurable: true
    });
    LoanInformationComponent.prototype.addLoan = function () {
        this.loans.push(this._calculatorFormService.buildLoan());
    };
    LoanInformationComponent.prototype.removeLoan = function () {
        this.loans.removeAt(this.loans.length - 1);
    };
    Object.defineProperty(LoanInformationComponent.prototype, "specialTermsLoans", {
        get: function () {
            return this.calcForm.get('specialTermsLoans');
        },
        enumerable: true,
        configurable: true
    });
    LoanInformationComponent.prototype.addSpecialTermsLoan = function () {
        this.specialTermsLoans.push(this._calculatorFormService.buildSpecialTermsLoan());
    };
    LoanInformationComponent.prototype.removeSpecialTermsLoan = function () {
        this.specialTermsLoans.removeAt(this.specialTermsLoans.length - 1);
    };
    return LoanInformationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], LoanInformationComponent.prototype, "calcForm", void 0);
LoanInformationComponent = __decorate([
    core_1.Component({
        templateUrl: "app/calculators/rental-property-calculator/views/loan-information/loan-information.component.html",
        selector: 'loaninformation',
        providers: [rental_property_calculator_service_1.RentalCalculatorService, calculator_form_service_1.CalculatorFormService]
    }),
    __metadata("design:paramtypes", [rental_property_calculator_service_1.RentalCalculatorService,
        calculator_form_service_1.CalculatorFormService])
], LoanInformationComponent);
exports.LoanInformationComponent = LoanInformationComponent;
//# sourceMappingURL=loan-information.component.js.map