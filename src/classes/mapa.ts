import { Marcador } from './marcador';

export class Mapa {

    private marcadores: {[key: string]: Marcador} = {
        '1': {
            id: '1',
            nombre: 'Balsicas',
            lng: -0.956562,
            lat: 37.818694,
            color: '#790af0'
        },
        '2': {
            id: '2',
            nombre: 'Balsicas',
            lng: -0.956672,
            lat: 37.818694,
            color: '#790af0'
        },
        '3': {
            id: '3',
            nombre: 'Balsicas',
            lng: -0.956852,
            lat: 37.818694,
            color: '#790af0'
        }
    };

    constructor() {}

    getMarcadores(): {[key: string]: Marcador} {
        return this.marcadores;
    }

    borrarMarcador(id: string): {[key: string]: Marcador} {
        delete this.marcadores[id];
        return this.marcadores;
    }

    agregarMarcador(marcador: Marcador): void {

        this.marcadores[marcador.id] = marcador;

    }

    moverMarcador( marcador: Marcador ): void {

        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;

    }

}