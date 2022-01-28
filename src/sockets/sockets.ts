import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { ListaUsuarios } from '../classes/lista-usuarios';
import { Usuario } from '../classes/usuario';


export const usuarioConectados = new ListaUsuarios();

export const conectarUsuario = (client: Socket, io:socketIO.Server) => {

    const usuario = new Usuario(client.id);
    usuarioConectados.agregar(usuario);
};

export const disconnect = ( client: Socket, io: socketIO.Server ) => {

    client.on('disconnect', () => {
        usuarioConectados.borrarUsuario(client.id);
        console.log(`Cliente ${client.id}: desconectado`);
        io.emit('usuarios-activos', usuarioConectados.lista);
    });

};

// Escuchar mensajes
export const message = ( client: Socket, io: socketIO.Server ) => {

    client.on('message', ( payload ) => {

        io.emit('new-message', payload);
    });


};


// Configurar usuario
export const user = (client: Socket, io: socketIO.Server) => {

    client.on('conf-user', (payload, callback) => {
        
        usuarioConectados.actualizarNombre(client.id, payload.nombre);
        io.emit('usuarios-activos', usuarioConectados.lista);
        
        callback({
            ok: true,
            message: `Cliente ${payload.nombre}: actualizado`
        });
    })

}

// emitir usuarios activos
export const emitUsuariosActivos = (client: Socket, io: socketIO.Server) => {

    client.on('emit-usuarios-activos', () => {

        io.to( client.id ).emit('usuarios-activos', usuarioConectados.lista);
    })

};


export const emitLogout = (client: Socket, io: socketIO.Server) => {

    client.on('emit-logout', () => {

        usuarioConectados.borrarUsuario(client.id);
        io.emit('usuarios-activos', usuarioConectados.lista);

    })

};