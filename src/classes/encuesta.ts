import { DataTest } from '../interfaces/dataTest.interface';

export class EncuestaData {
    
    datasets: Array<DataTest>;
    labels: Array<string>;

    constructor() {
        
        this.datasets = [{
            data: new Array(5).fill(0),
            label: 'Preguntas'
        }];

        this.labels = new Array(5).fill('').map((val:string, index: number) => 'Pregunta ' + (index + 1));

    }

    getEncuestaData(): {datatest: Array<DataTest>, labels: Array<string>} {

        return {datatest: this.datasets, labels: this.labels};

    }

    incrementarValor( pregunta: number, valor: number): {datatest: Array<DataTest>, labels: Array<string>} {

        this.datasets[0].data[pregunta] += valor;
        
        return this.getEncuestaData();
    }
}