export default class Usuario {

    #nombre;
    #apellido; 
    #email;


    constructor(nombre , apellido , email){
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#email = email; 
    }

    getNombre(){
        return this.#nombre;
    }
    setNombre(nombre){
        this.#nombre = nombre;
    }

    getApellido(){
        return this.#apellido;
    }
    setApellido(apellido){
        this.#apellido = apellido;
    }

    getEmail(){
        return this.#email;
    }
    setEmail(email){
        this.#email = email;
    }



}


