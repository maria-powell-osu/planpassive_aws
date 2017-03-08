import { Component,OnInit } from '@angular/core';
import { RentalCalculatorService } from './rental-property-calculator.service';
import { LoaderComponent} from '../../shared/loader/loader.component';

@Component({
    templateUrl: 'app/calculators/rental-property-calculator/rental-property-calculator.component.html',
     providers: [RentalCalculatorService]
})
export class RentalPropertyCalculatorComponent implements OnInit {
     loading : Boolean;
     view : string;

     constructor (_rentalCalculatorService : RentalCalculatorService){}

     ngOnInit(): void {
         this.loading = false;
         this.view = "loan";
     }
    
}