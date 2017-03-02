import {Component} from 'angular2/core';
import {BlogsComponent} from './blogs/blogs.component';


@Component({
    selector: 'plan-passive',
    template: '<h1>Hello Angular</h1><blogs></blogs>',
    directives: [BlogsComponent]
})
export class AppComponent { }