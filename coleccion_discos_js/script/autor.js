"use strict";

export class Autor {
    #id;
    #nombre;
    #fecha_nacimiento;
    #discos_publicados;
    static id_gen=0;

    constructor(nombre, fecha_nacimiento) {
        this.#id=Autor.id_gen++;
        this.#nombre=nombre;
        this.#fecha_nacimiento=fecha_nacimiento;
        this.#discos_publicados=[];
    }

    /* Getters y setters */

    get id() {
        return this.#id;
    }

    set id(valor) {
        this.#id = valor;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        this.#nombre = valor;
    }

    get fecha_nacimiento() {
        return this.#fecha_nacimiento;
    }

    set fecha_nacimiento(valor) {
        this.#fecha_nacimiento = valor;
    }

    get discos_publicados() {
        return this.#discos_publicados;
    }

    set discos_publicados(valor) {
        this.#discos_publicados = valor;
    }

    /* Otros métodos */

    listarAutores(autores) {
        console.log("Estos son los autores que hay guardados: ");
        for (let i=0; i<autores.length; i++) {
            autores[i].imprimirInformacion();
        }
    }

    imprimirInformacion() {
        console.log("*******Datos autor*******");
        console.log("ID: "+this.#id);
        console.log("Nombre: "+this.#nombre);
        console.log("Fecha nacimiento: "+this.#fecha_nacimiento);
        console.log("Discos publicados: "+this.#discos_publicados.length);
    }

    listarDiscos() {
        console.log("Se van a listar los discos: ");
        for (let i=0; i<this.#discos_publicados.length; i++) {
            this.#discos_publicados[i].imprimirInformacion();
        }        
    }

    /* Este método revisa todos los discos en la colección y las estanterias y los añade al array de discos publicados del autor */
    anadirDiscosPublicados(coleccion, autores) {
        for (let i = 0; i < coleccion.length; i++) {
            for (let j = 0; j < coleccion.longitudEstanteria(i); j++) {
                let disco = coleccion.devolverDisco(i, j);
                this.anadirDiscoAutor(disco, autores);
            }
        }
    }
    
    /* Este método coge el disco individual del método anterior, y busca el autor correspondiente en el array de autores, luego añade el 
    disco al array de discos publicados del autor, además verifica que la id del disco no está ya en el array de discos publicados */
    anadirDiscoAutor(disco, autores) {
        let salir=false;
        for (let i = 0; i < autores.length && !salir; i++) {
            if (disco.autor == autores[i].id && autores[i].#discos_publicados.findIndex(comparar => comparar.id == disco.id) == -1) {
                autores[i].#discos_publicados.push(disco);
                salir = true;
            }
        }
    }

    /* Este método imprime todos los discos de un autor */
    listarAutorDiscos(autores) {
        let id_autor=0;
        autores[1].listarAutores(autores);
        id_autor=Number(prompt("Escoge la ID de uno de los autores que se han listado en la consola: "));
        let indice_autor=autores.findIndex(autor => autor.id==id_autor);
        if (indice_autor!=-1) {
            autores[indice_autor].listarDiscos();
        }
        else {
            console.log("Opción inválida");
        }
    }
}