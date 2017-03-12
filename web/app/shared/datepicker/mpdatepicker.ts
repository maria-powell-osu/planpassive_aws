import { ViewChild, ElementRef, OnInit, Directive , Input, Self, Renderer, EventEmitter, Output} from '@angular/core';
import {FormControlName,  NgControl, DefaultValueAccessor } from '@angular/forms';

declare var jQuery: any;

@Directive({
  selector: '[mp-datepicker]'
})
export class mpDatePicker implements OnInit {
    @Output() dateChange = new EventEmitter();
    private element: ElementRef;
     
   
   constructor( element: ElementRef) {
    this.element = element;
  }
  
  ngOnInit() {
     jQuery(this.element.nativeElement).datepicker({
                dateFormat: 'mm/dd/yy',
                changeMonth: true,
                changeYear: true,
                onSelect: (date:any) => {
                  //returns the new date value
                  this.dateChange.next(date);
                }
            });
  }
}