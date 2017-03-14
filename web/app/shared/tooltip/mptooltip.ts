import {OnInit, Directive, ElementRef, Input} from '@angular/core';

declare var jQuery: any;

@Directive({
  selector: '[mptooltip]'
})
export class mpToolTip implements OnInit {
    private element: ElementRef;
    @Input () text : string;
     
   constructor( element: ElementRef) {
    this.element = element;
  }
  
  ngOnInit() {
    jQuery(this.element.nativeElement).attr('title', this.text).tooltip();
  }
}