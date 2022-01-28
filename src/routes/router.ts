import { Router, Request, Response } from 'express';
import { Server } from '../classes/server';
import { usuarioConectados } from '../sockets/sockets';


export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
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