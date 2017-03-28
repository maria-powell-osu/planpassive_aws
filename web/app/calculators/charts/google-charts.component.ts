import { Directive, Input,Output, ElementRef ,OnInit, EventEmitter} from '@angular/core';
import { FormGroup , FormBuilder, FormControl } from '@angular/forms';
declare var google: any;
//declare var jQuery: any;

// @Component({
//     selector: 'googlecharts',
// })
@Directive({
  selector: 'googlecharts'
})
export class GoogleChartsComponent implements OnInit{
    private element: ElementRef;
    @Input() chartType: string; 
    @Input() loading: boolean;
    @Input() control: FormControl;
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
    }
    constructor(element: ElementRef){
        this.element = element;       
    }

    private drawDataTable(rawData:any){
        var table;
        var data = new google.visualization.DataTable();
        var tableElement = this.element.nativeElement;

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
        var chartElement = this.element.nativeElement;
        
        //Initialize chart
        var chart = new google.visualization.ComboChart(chartElement);

        //Create data table for chart   
        var data = google.visualization.arrayToDataTable(rawData.data);

        //Draw the combo chart
        chart.draw(data, rawData.options);
    }
}
