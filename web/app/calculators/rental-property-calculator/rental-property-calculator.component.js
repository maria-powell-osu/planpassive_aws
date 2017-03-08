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
    }
    RentalPropertyCalculatorComponent.prototype.ngOnInit = function () {
        this.loading = false;
        this.view = "loan";
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