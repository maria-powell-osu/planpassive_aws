import { Component, Input, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RentalCalculatorService } from '../../rental-property-calculator.service';



@Component({
    templateUrl: "app/calculators/rental-property-calculator/views/results/results.component.html",
    selector: 'result'
})

export class ResultsComponent implements AfterViewInit{
     @Input() calcForm: FormGroup;
     @Input() resultData: any;
     cashFlowTableLoading: boolean;
     cashFlowChartLoading: boolean;
     totalReturnChartLoading: boolean;
     totalReturnTableLoading: boolean;
     cashOnEquityChartLoading: boolean;
     cashOnEquityTableLoading: boolean;
     pieChartLoading : boolean;
     cashFlowView : string;
     totalReturnView : string;
     cashOnEquityView : string;
     incomePieChartsLabels: any;


     constructor(private _rentalCalculatorService: RentalCalculatorService, private _crd: ChangeDetectorRef ){
         this.cashFlowTableLoading = false;
         this.cashFlowChartLoading = false;
         this.totalReturnChartLoading = false;
         this.totalReturnTableLoading = false;
         this.cashOnEquityChartLoading = false;
         this.cashOnEquityTableLoading = false;
         this.pieChartLoading = false;
         this.cashFlowView ='graph';
         this.totalReturnView = 'graph';
         this.cashOnEquityView = 'graph';
     }

     ngAfterViewInit() {
     
        //setting this to true, highlights missing fields now in form
        this.calcForm.patchValue({'userClickedResults': true});

        //Only run calculation if the required inputs are there and valid
        if(this.calcForm.valid){
            this.calcForm
            this.resultData = this._rentalCalculatorService.calculateResults(this.calcForm);

            if (this.resultData){

                //watchers have been added for those used in charts to draw up the graphs
                this.calcForm.patchValue({'summaryData': this.resultData.summaryData});
                this.calcForm.patchValue({'cashFlowProjectionTableData': this.resultData.cashFlowProjectionTable});
                this.calcForm.patchValue({'cashFlowProjectionChart': this.resultData.cashFlowProjectionChart});
                this.calcForm.patchValue({'cashFlowSummary': this.resultData.cashFlowSummary});
                this.calcForm.patchValue({'incomePieChart': this.resultData.incomePieChart});
                this.calcForm.patchValue({'expensePieChart': this.resultData.expensePieChart});
                this.calcForm.patchValue({'cashOnEquityTable': this.resultData.cashOnEquityTable});
                this.calcForm.patchValue({'cashOnEquityChart': this.resultData.cashOnEquityChart});
                this.calcForm.patchValue({'totalReturnTable': this.resultData.totalReturnTable});
                this.calcForm.patchValue({'totalReturnStackedBarChart': this.resultData.totalReturnStackedBarChart});
                this.calcForm.patchValue({'totalReturnSummary': this.resultData.totalReturnSummary});

                //since we are in ngAfterViewInit which loads after view is loaded, we tell Angular to check the values again
                //without this view will not load
                this._crd.detectChanges();
               
            }
        }
     
     }
}