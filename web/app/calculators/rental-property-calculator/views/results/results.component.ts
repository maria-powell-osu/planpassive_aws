import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Component({
    templateUrl: "app/calculators/rental-property-calculator/views/results/results.component.html",
    selector: 'result'
})

export class ResultsComponent {
     @Input() calcForm: FormGroup;
     @Input() resultData: any;
     cashFlowTableLoading: boolean;
     cashFlowChartLoading: boolean;

     constructor(){
         this.cashFlowTableLoading = false;
         this.cashFlowChartLoading = false;
     }
}