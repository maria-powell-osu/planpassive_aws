import { Component, Input,Output ,OnInit, EventEmitter} from '@angular/core';
import { FormGroup , FormBuilder, FormControl } from '@angular/forms';
declare var google: any;
declare var jQuery: any;

// @Component({
//     selector: 'googlecharts',
// })
@Component({
  selector: 'googlecharts',
  template: '<div [attr.id]="chartId"></div>'
})
export class GoogleChartsComponent implements OnInit{
    @Input() chartType: string; 
    @Input() loading: boolean;
    @Input() control: FormControl;
    @Input() chartId: string;
    @Output() loadingChange = new EventEmitter<boolean>();

    ngOnInit() {
        var self = this;
         //Added to ensure that google loads library fully before drawing charts
        google.charts.setOnLoadCallback(processTable);

        //Callback function
        function processTable(){
        
            //Watcher added to listen for chart changes to take effect - draw charts then
            self.control.valueChanges
                .subscribe((data:any)=>{
                    
                    //Show loader
                    self.loadingChange.emit(true);

                    //select chart type and trigger chart drawing
                    switch (self.chartType){
                        case 'dataTable':
                            self.drawDataTable(data);
                            break;
                        case 'comboChart':
                            self.drawComboChart(data);
                            break;
                        case 'pieChart':
                            self.drawPieChart(data);
                            break;
                        case 'columnChart':
                            self.drawColumnChart(data);
                            break;
                        case 'gauge':
                            break;
                    }
                    //Hide loader
                    self.loadingChange.emit(false);
                    
                    // setTimeout(function(){ 
                    //     self.loadingChange.emit(false);

                    // }, 2000);
            });
        }
    }
    constructor(){}

    private drawColumnChart(rawData: any){
        var chartElement = jQuery("#" + this.chartId)[0];

        //Initialize chart
        var chart = new google.visualization.ColumnChart(chartElement);

        //Create data table for chart   
        var data = google.visualization.arrayToDataTable(rawData.data);

        //Draw Chart
        chart.draw(data, rawData.options);
    }

    private drawPieChart(rawData:any){
         var chartElement = jQuery("#" + this.chartId)[0];

        //Intialize chart
        var pieChart = new google.visualization.PieChart(chartElement);

        //Create data table for chart
        var data = google.visualization.arrayToDataTable(rawData.data);

        /*To ensure that the table data gets updated*/
        pieChart.draw(data, rawData.options);
    }

    private drawDataTable(rawData:any){
        var table;
        var data = new google.visualization.DataTable();
        var tableElement = jQuery("#" + this.chartId)[0];
        

        //Add Table Columns
        (rawData.columns).forEach(function(column:any) {
        data.addColumn('number', column);
        });

        //Add Table Rows
        data.addRows(rawData.rows);

        //Initialize Table
        table = new google.visualization.Table(tableElement);

        table.draw(data, rawData.options);
    }

    private drawComboChart(rawData:any){
        //var chartElement = this.element.nativeElement;
        var chartElement = jQuery("#" + this.chartId)[0];

        //Initialize chart
        var chart = new google.visualization.ComboChart(chartElement);

        //Create data table for chart   
        var data = google.visualization.arrayToDataTable(rawData.data);

        //Draw the combo chart
        chart.draw(data, rawData.options);
    }
}
