import { Component } from '@angular/core';
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
    selector: 'plan-passive',
    template: `
       <navbar></navbar>
       
        <router-outlet></router-outlet>
    `
})
export class AppComponent { }
