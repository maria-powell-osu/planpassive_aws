import { Component, Input, EventEmitter } from '@angular/core';
import { FormControl , FormBuilder} from '@angular/forms';
import {mpDatePicker} from "../../../shared/datepicker/mpdatepicker";



@Component({
    templateUrl: "app/calculators/rental-property-calculator/templates/loan-information.component.html",
    selector: 'loaninformation'
})


export class LoanInformationComponent {
    @Input() parentFormGroup: FormBuilder;

    constructor() {
    }
}