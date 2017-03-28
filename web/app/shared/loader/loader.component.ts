import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: "app/shared/loader/loader.component.html"
 })
export class LoaderComponent {
    @Input() loading: false; 
}