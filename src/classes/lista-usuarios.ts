import { Usuario } from './usuario';

export class ListaUsuarios {

    private _lista: Array<Usuario> = [];

    constructor() {

    }

    public agregar(usuario: Usuario): ListaUsuarios {

        this._lista.push(usuario);
        console.log(this._lista);
        
        return this;

    }
 
    public actualizarNombre(id: string, nombre: string) {

        console.log("==== Actualizando usuario ====");
        
        const user = this._lista.find(usuario => usuario.id == id);
        if (user) user.nombre = nombre;
        console.log(this._lista);
        

    }
    
    public get lista(): Array<Usuario> {
        return this._lista.filter(item => item.nombre != 'sin-nombre');
    }

    public getUsuario(id: string): Usuario | undefined {

        return this._lista.find(usuario => usuario.id == id);
    }

    public getUsuariosBySala(sala: string): Array<Usuario> {

        return this._lista.filter(usuario => usuario.sala == sala);

    }

    public borrarUsuario(id: string): Usuario | void {

        const usuario: Usuario | undefined = this.getUsuario(id);

        if (!usuario) {
            console.log(`El usuario con id: ${id} no existe`);
            return;
        }

        const userPos: number = this._lista.indexOf(usuario);

        if (userPos != -1) this._lista.splice(userPos, 1);
        console.log(this._lista);

        return usuario;

    }

}