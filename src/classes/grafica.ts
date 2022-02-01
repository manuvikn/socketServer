import { DataTest } from '../interfaces/dataTest.interface';

export class GraficaData {
    
    datasets: Array<DataTest>;
    labels: Array<string>;

    constructor() {
        
        this.datasets = [{
            data: new Array(7).fill(0),
            label: 'Series A'/* ,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin' */
        }];

        this.labels = [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio' ];

    }

    getDataGrafica(): {datatest: Array<DataTest>, labels: Array<string>} {

        return {datatest: this.datasets, labels: this.labels};

    }

    modificarValor( mes: string, valor: number): {datatest: Array<DataTest>, labels: Array<string>} {

        mes = mes.trim().toLocaleLowerCase();
        
        for (let i in this.labels) {
            if (this.labels[i] === mes) this.datasets[0].data[i] += valor;
        }

        return this.getDataGrafica();
    }
}