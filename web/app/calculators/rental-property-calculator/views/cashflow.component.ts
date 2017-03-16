import { Component, Input } from '@angular/core';
import { FormGroup , FormBuilder, FormArray} from '@angular/forms';
import { mpDatePicker } from "../../../shared/datepicker/mpdatepicker";
import { mpToolTip } from "../../../shared/tooltip/mptooltip";
import { RentalCalculatorService} from "../rental-property-calculator.service";
import { CalculatorFormService } from "../calculator-form.service"; 


@Component({
    templateUrl: "app/calculators/rental-property-calculator/views/cashflow.component.html",
    selector: 'cashflow',
    providers: [RentalCalculatorService, CalculatorFormService]
})

export class CashFlowComponent {
     @Input() calcForm: FormGroup;
     showIncomeOptions: false;
     expenseOptions : false;

    constructor( private _rentalCalculatorService : RentalCalculatorService,
                 private _calculatorFormService : CalculatorFormService) {}
    get units(): FormArray{
        return <FormArray>this.calcForm.get('units');
    }

    addUnit() : void {
         this.units.push(this._calculatorFormService.buildUnit());
    }

    removeUnit() : void {
        this.units.removeAt(this.units.length -1);
    }

    get supplementalIncomes(): FormArray{
        return <FormArray>this.calcForm.get('supplementalIncomes');
    }

    addSupplementalIncome() : void {
         this.supplementalIncomes.push(this._calculatorFormService.buildSupplementalIncome());
    }

    removeSupplementalIncome() : void {
        this.supplementalIncomes.removeAt(this.supplementalIncomes.length -1);
    }

    get utilities(): FormArray{
        return <FormArray>this.calcForm.get('utilities');
    }

    addUtility() : void {
         this.utilities.push(this._calculatorFormService.buildUtility());
    }

    removeUtility() : void {
        this.utilities.removeAt(this.utilities.length -1);
    }

    get expenses(): FormArray{
        return <FormArray>this.calcForm.get('expenses');
    }

    addExpense() : void {
         this.expenses.push(this._calculatorFormService.buildExpense());
    }

    removeExpense() : void {
        this.expenses.removeAt(this.expenses.length -1);
    }

    get capitalExpenditures(): FormArray{
        return <FormArray>this.calcForm.get('capitalExpenditures');
    }
    
    addCapitalExpenditure() : void {
         this.capitalExpenditures.push(this._calculatorFormService.buildCapitalExpenditure());
    }

    removeCapitalExpenditure() : void {
        this.capitalExpenditures.removeAt(this.capitalExpenditures.length -1);
    }


    
}