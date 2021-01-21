import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {

    @Input() titulo: string;
    @Input() dados: any;
    barData: any;

    constructor() { }

    ngOnInit(): void {
        this.barData = {
            labels: this.dados.labels || [],
            datasets: [
                {
                    label: 'Quantidade',
                    backgroundColor: '#03A9F4',
                    borderColor: '#03A9F4',
                    data: this.dados.datasets[0].data || []
                }
            ]
        };
     }
}
