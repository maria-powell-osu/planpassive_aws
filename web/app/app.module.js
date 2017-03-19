"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Pre-Built Components
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var forms_2 = require("@angular/forms");
//Plan Passive Components
var blog_list_component_1 = require("./blogs/blog-list/blog-list.component");
var blog_view_component_1 = require("./blogs/blog-view/blog-view.component");
var home_component_1 = require("./home/home.component");
var calculators_component_1 = require("./calculators/calculators.component");
var rental_property_calculator_component_1 = require("./calculators/rental-property-calculator/rental-property-calculator.component");
var investment_return_calculator_component_1 = require("./calculators/investment-return-calculator/investment-return-calculator.component");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var loader_component_1 = require("./shared/loader/loader.component");
var cashflow_component_1 = require("./calculators/rental-property-calculator/views/cashflow/cashflow.component");
var loan_information_component_1 = require("./calculators/rental-property-calculator/views/loan-information/loan-information.component");
var results_component_1 = require("./calculators/rental-property-calculator/views/results/results.component");
var mpdatepicker_1 = require("./shared/datepicker/mpdatepicker");
var mptooltip_1 = require("./shared/tooltip/mptooltip");
var footer_component_1 = require("./shared/footer/footer.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            forms_2.FormsModule,
            router_1.RouterModule.forRoot([
                //Gets matched on first-match basis
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'blogs', component: blog_list_component_1.BlogListComponent },
                { path: 'blog/:name', component: blog_view_component_1.BlogViewComponent },
                { path: 'investment-calculators', component: calculators_component_1.CalculatorsComponent },
                { path: 'rental-property-calculator', component: rental_property_calculator_component_1.RentalPropertyCalculatorComponent },
                { path: 'investment-return-calculator', component: investment_return_calculator_component_1.InvestmentReturnCalculatorComponent },
                { path: '', redirectTo: "home", pathMatch: "full" }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            blog_view_component_1.BlogViewComponent,
            blog_list_component_1.BlogListComponent,
            home_component_1.HomeComponent,
            navbar_component_1.NavbarComponent,
            calculators_component_1.CalculatorsComponent,
            rental_property_calculator_component_1.RentalPropertyCalculatorComponent,
            investment_return_calculator_component_1.InvestmentReturnCalculatorComponent,
            loader_component_1.LoaderComponent,
            cashflow_component_1.CashFlowComponent,
            loan_information_component_1.LoanInformationComponent,
            results_component_1.ResultsComponent,
            mpdatepicker_1.mpDatePicker,
            mptooltip_1.mpToolTip,
            footer_component_1.FooterComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map