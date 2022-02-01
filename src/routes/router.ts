import { Router, Request, Response } from 'express';
import { EncuestaData } from '../classes/encuesta';
import { GraficaData } from '../classes/grafica';
import { Marcador } from '../classes/marcador';
import { Server } from '../classes/server';
import { mapa, usuarioConectados } from '../sockets/sockets';


export const router = Router();

const grafica = new GraficaData();
const encuesta = new EncuestaData();

router.get('/grafica', (req: Request, res: Response) => {

    res.json({
        grafica
    });

});

router.post('/grafica', (req: Request, res: Response) => {

    const { mes, unidades } = req.body;

    grafica.modificarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('post-grafica', grafica);

    res.json({
        grafica
    });

});

router.get('/encuesta', (req: Request, res: Response) => {

    res.json({
        encuesta
    });

});

router.post('/encuesta', (req: Request, res: Response) => {

    const { pregunta, valor } = req.body;

    encuesta.incrementarValor(Number(pregunta), Number(valor));

    const server = Server.instance;
    server.io.emit('post-encuesta', encuesta);

    res.json({
        encuesta
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const { message, origin } = req.body;
    const payload = {message, origin};

    const server = Server.instance;

    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        message,
        origin
    });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

    const { message, origin } = req.body;
    const { id } = req.params;
    
    const payload = {
        origin,
        message
    }

    const server = Server.instance;

    server.io.in( id ).emit('private-message', payload);

    res.json({
        ok: true,
        message,
        id
    });

});


// SERVICIO PARA OBTENER TODOS LOS IDS DE LOS USUARIOS ACTIVOS

router.get('/usuarios', async (req: Request, res: Response) => {

    const server = Server.instance;
    const clientsSet = await server.io.allSockets();
    const clients = Array.from(clientsSet);

    res.json({
        ok: true,
        clients
    });

});



// SERVICIO PARA OBTENER TODOS LOS USUARIOS ACTIVOS

router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clients: usuarioConectados.lista
    });

});


// MODULO DE MAPBOX

router.get('/mapbox', (req: Request, res: Response) => {

    res.json(mapa.getMarcadores());

})


router.post('/mapbox', (req: Request, res:Response) => {

    const {id,nombre,lng,lat,color} = req.body;
    
    const marcador: Marcador = new Marcador(id,nombre,lng,lat,color);

    res.json({marcador});

});