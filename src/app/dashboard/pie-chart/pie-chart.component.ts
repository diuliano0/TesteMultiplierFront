import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

    @Input() titulo;
    @Input() dados: any;
    pieData: any;

    constructor() { }

    ngOnInit(): void {
        this.pieData = {
            labels: this.dados.labels || [],
            datasets: [
                {
                    data: this.dados.datasets[0].data || [],
                    backgroundColor: this.dados.datasets[0].backgroundColor || [],
                    hoverBackgroundColor: this.dados.datasets[0].hoverBackgroundColor || []
                }]
            };
     }
}
