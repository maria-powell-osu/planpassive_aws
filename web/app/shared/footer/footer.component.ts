import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: "app/shared/footer/footer.component.html"
 })
export class FooterComponent implements OnInit{
    today : Date;
    currentYear : number;

    constructor(){}

     ngOnInit(): void {
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
    }
}