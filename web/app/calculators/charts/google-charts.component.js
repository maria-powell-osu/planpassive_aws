"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
//declare var jQuery: any;
// @Component({
//     selector: 'googlecharts',
// })
var GoogleChartsComponent = (function () {
    function GoogleChartsComponent(element) {
        this.loadingChange = new core_1.EventEmitter();
        this.element = element;
    }
    GoogleChartsComponent.prototype.ngOnInit = function () {
        var self = this;
        //Added to ensure that google loads library fully before drawing charts
        google.charts.setOnLoadCallback(processTable);
        //Callback function
        function processTable() {
            //Watcher added to listen for chart changes to take effect - draw charts then
            self.control.valueChanges
                .subscribe(function (data) {
                //Show loader
                self.loadingChange.emit(true);
                //select chart type and trigger chart drawing
                switch (self.chartType) {
                    case 'dataTable':
                        self.drawDataTable(data);
                        break;
                    case 'comboChart':
                        self.drawComboChart(data);
                        break;
                    case 'piechart':
                        break;
                    case 'table':
                        break;
                    case 'gauge':
                        break;
                }
                //Hide loader
                self.loadingChange.emit(false);
            });
        }
    };
    GoogleChartsComponent.prototype.drawDataTable = function (rawData) {
        var table;
        var data = new google.visualization.DataTable();
        var tableElement = this.element.nativeElement;
        //Add Table Columns
        (rawData.columns).forEach(function (column) {
            data.addColumn('number', column);
        });
        //Add Table Rows
        data.addRows(rawData.rows);
        //Initialize Table
        table = new google.visualization.Table(tableElement);
        table.draw(data, rawData.options);
    };
    GoogleChartsComponent.prototype.drawComboChart = function (rawData) {
        var chartElement = this.element.nativeElement;
        //Initialize chart
        var chart = new google.visualization.ComboChart(chartElement);
        //Create data table for chart   
        var data = google.visualization.arrayToDataTable(rawData.data);
        //Draw the combo chart
        chart.draw(data, rawData.options);
    };
    return GoogleChartsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleChartsComponent.prototype, "chartType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GoogleChartsComponent.prototype, "loading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], GoogleChartsComponent.prototype, "control", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GoogleChartsComponent.prototype, "loadingChange", void 0);
GoogleChartsComponent = __decorate([
    core_1.Directive({
        selector: 'googlecharts'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleChartsComponent);
exports.GoogleChartsComponent = GoogleChartsComponent;
//# sourceMappingURL=google-charts.component.js.map