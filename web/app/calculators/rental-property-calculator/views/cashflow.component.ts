import { Component, Input } from '@angular/core';
import { FormGroup , FormBuilder, FormArray} from '@angular/forms';
import { mpDatePicker } from "../../../shared/datepicker/mpdatepicker";
import { mpToolTip } from "../../../shared/tooltip/mptooltip";
import { RentalCalculatorService} from "../rental-property-calculator.service";


@Component({
    templateUrl: "app/calculators/rental-property-calculator/views/cashflow.component.html",
    selector: 'cashflow',
    providers: [RentalCalculatorService]
})

export class CashFlowComponent {
     @Input() calcForm: FormGroup;
     showIncomeOptions: false;

    get units(): FormArray{
        return <FormArray>this.calcForm.get('units');
    }

    addUnit() : void {
         this.units.push(this._rentalCalculatorService.buildUnit());
    }

    removeUnit() : void {
        this.units.removeAt(this.units.length -1);
    }

    get supplementalIncomes(): FormArray{
        return <FormArray>this.calcForm.get('supplementalIncomes');
    }

    addSupplementalIncome() : void {
         this.supplementalIncomes.push(this._rentalCalculatorService.buildSupplementalIncome());
    }

    removeSupplementalIncome() : void {
        this.supplementalIncomes.removeAt(this.supplementalIncomes.length -1);
    }

    get utilities(): FormArray{
        return <FormArray>this.calcForm.get('utilities');
    }

    addUtility() : void {
         this.utilities.push(this._rentalCalculatorService.buildUtility());
    }

    removeUtility() : void {
        this.utilities.removeAt(this.utilities.length -1);
    }

    get expenses(): FormArray{
        return <FormArray>this.calcForm.get('expenses');
    }

    addExpense() : void {
         this.expenses.push(this._rentalCalculatorService.buildExpense());
    }

    removeExpense() : void {
        this.expenses.removeAt(this.expenses.length -1);
    }


    constructor( private _rentalCalculatorService : RentalCalculatorService) {}
}