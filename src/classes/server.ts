import express from 'express';
import { SERVER_PORT } from '../globals/environments';
import socketIO from 'socket.io';
import http from 'http';
import { Server as socket } from 'socket.io';
import * as s from '../sockets/sockets';

export class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpSever: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpSever = http.createServer(this.app);
        this.io = new socket(this.httpSever, {cors:{origin:'http://localhost:4200'}});

        this.listenSockets();
    }

    public static get instance(): Server {

        return this._instance || ( this._instance = new this() );

    }

    private listenSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            console.log(`Cliente ${cliente.id}: conectado`);

            s.postMarcador(cliente, this.io);
            
            s.moveMarcador(cliente, this.io);

            s.removeMarcador(cliente, this.io);

            /* s.conectarUsuario(cliente, this.io);

            s.user(cliente, this.io);

            s.emitUsuariosActivos(cliente, this.io);

            s.emitLogout(cliente, this.io);

            s.message(cliente, this.io); */

            s.disconnect(cliente, this.io);

        });

    }

    start( callback: () => void )  {

        this.httpSever.listen(this.port, callback );

    }

}