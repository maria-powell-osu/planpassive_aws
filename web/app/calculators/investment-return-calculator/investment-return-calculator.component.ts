import { Component, ChangeDetectorRef} from '@angular/core';
import { FormGroup , FormBuilder, FormControl, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import { InvestmentCalculatorService } from './investment-return-calculator.service';

@Component({
    templateUrl: 'app/calculators/investment-return-calculator/investment-return-calculator.component.html',
    providers: [InvestmentCalculatorService]
})
export class InvestmentReturnCalculatorComponent {
    calcForm : FormGroup;
    userClickedCalculate : boolean = false;
    result : any;
    chartView : string = 'barGraph';
    futureValueStackColumnChartLoading : boolean = false;
    futureValuePieChartLoading : boolean = false;

    constructor(private _fb: FormBuilder,
                private _investmentCalculatorService: InvestmentCalculatorService,
                private _crd: ChangeDetectorRef ){
        this.result = {} as any;
         this.calcForm = this._fb.group({  
            investAmount : ['', [Validators.required]],
            monthlyContributions : ['', [Validators.required]],
            annualRateOfReturn : ['', [Validators.required]],
            years : ['', [Validators.required]],
            yearsBeforeContributing: '',
            futureValuePieChartData : '',
            futureValueStackedBarChartData : ''
         });
    }

    calculate(){
        this.userClickedCalculate = true;
        if(this.calcForm.valid){
            this.result = this._investmentCalculatorService.calculateResults(this.calcForm);

             if (this.result){

                //watchers have been added for those used in charts to draw up the graphs
                this.calcForm.patchValue({'futureValueStackedBarChartData': this.result.dataForVisuals.futureValueChart});
                this.calcForm.patchValue({'futureValuePieChartData': this.result.dataForVisuals.futureValuePieChart});


                //since we are in ngAfterViewInit which loads after view is loaded, we tell Angular to check the values again
                //without this view will not load
                this._crd.detectChanges();
               
            }
        }         
    }
}