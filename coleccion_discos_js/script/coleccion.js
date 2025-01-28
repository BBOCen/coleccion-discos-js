"use strict";

export class Coleccion {
    #estanterias;
    constructor() {
        this.#estanterias=[];
    }

    /* Getter para la longitud de la estantería */

    get length() {
        return this.#estanterias.length;
    }

    /* Función para la longitud del array adentro de estanterias */

    longitudEstanteria(i) {
        return this.#estanterias[i].length;
    }

    /* Otros métodos */

    anadirEstanteria(estanteria) {
        this.#estanterias.push(estanteria);
    }

    precargarDosEstanterias(array_discos1, array_discos2) {
        this.anadirEstanteria(array_discos1);
        this.anadirEstanteria(array_discos2);
    }

    /* Esta método imprime cada disco que hay en la estantería */

    listarDiscosEstanteria(numero_estanteria) {
        console.log("Se van a listar los discos de la estantería: ");
        console.log("┌──────────────────────────────────────────────────┐");
        for (let i=0; i<this.#estanterias[numero_estanteria].length; i++) {
            this.#estanterias[numero_estanteria][i].imprimirInformacion();
            if (i!=this.#estanterias[numero_estanteria].length-1) {
                console.log("|──────────────────────────────────────────────────|");
            }
            
        }
        console.log("└──────────────────────────────────────────────────┘");
    }

    /* Este método imprime todas las estanterías y los discos que tiene */

    listarEstanterias() {
        console.log("Se van a listar las estanterías: ");
        
        for (let i = 0; i < this.#estanterias.length; i++) {
            console.log("┌──────────────────────────────────────────────────┐");
            console.log("|Estantería "+i+"                                      |");
            console.log("|Discos: "+ this.#estanterias[i].length+"                                        |");
            console.log("└──────────────────────────────────────────────────┘");
        }
        
    }

    borrarDisco(numero_estanteria, eliminar) {
        console.log("Se va a eliminar el siguiente disco: \nNombre: "+this.#estanterias[numero_estanteria][eliminar].nombre+"\nID: "+this.#estanterias[numero_estanteria][eliminar].id);
        this.#estanterias[numero_estanteria].splice(eliminar, 1);
        console.log("Disco eliminado con éxito");
    }

    prestarDisco(numero_estanteria, prestar) {
        console.log("Se va a prestar el siguiente disco: \nNombre: "+this.#estanterias[numero_estanteria][prestar].nombre+"\nID: "+this.#estanterias[numero_estanteria][prestar].id);
        this.#estanterias[numero_estanteria][prestar].estado="Prestado";
        console.log("Disco prestado con éxito");
    }

    /* Este método devuelve el disco que hay en las coordenadas dadas */
    devolverDisco(numero_estanteria, indice_estanteria) {
        return this.#estanterias[numero_estanteria][indice_estanteria];
    }

    /* Este método se utiliza en la creación de un disco nuevo, encuentra el lugar adecuado para insertarlo. Verifica si hay una estantería con espacio libre
    o, si no hay, crea una estantería nueva */
    encontrarUltimaPosicion() {
        /* Esta variable representa la estantería en la se podrá guardar el disco */
        /* Se inicializa en -1 porque puede que en la posicion 0 ya haya una estantería */
        let array_posicion=-1;
        for (let i=0; i<this.#estanterias.length; i++) {
            if (this.#estanterias[i].length<10) {
                return array_posicion=i;
            } 
        }
        /* Si la variable sigue valiendo -1, es porque todas las estanterías están llenas, por lo tanto, se creará una nueva */
        if (array_posicion==-1) {
            let estanteria_nueva=[];
            this.anadirEstanteria(estanteria_nueva);
            return array_posicion=this.#estanterias.length-1;
        }
    }

    anadirDiscoEstanteria(disco) {
        this.#estanterias[disco.localizacion].push(disco);
        console.log("Se ha guardado el disco correctamente");
    }

    /* Este método devuelve el objeto disco en función de su ID */
    buscarId(id_disco) {
        for (let i=0; i<this.#estanterias.length; i++) {
            for (let j=0; j<this.#estanterias[i].length; j++) {
                if (this.#estanterias[i][j].id==id_disco) {
                    return this.#estanterias[i][j];
                }
            }
        }
        return false;
    }

    /* Este método es el encargado de actualizar la localización del disco */

    actualizarLocalizacion() {
        for (let i=0; i<this.#estanterias.length; i++) {
            this.listarDiscosEstanteria(i);
        }
        let id_disco=prompt("Estos son todos los discos en la colección, escoge la ID de uno para que se cambie de localización: ");
        let disco=this.buscarId(id_disco);
        /* Este código verifica si la id existe, si no es el caso, se devuelve nada para salir de la función */
        if (!disco) {
            console.log("Introduce una ID válida");
            return;
        }
        
        this.listarEstanterias();
        let estanteria=Number(prompt("Ahora introduce la estantería a la que quieres mover el disco, no puedes moverlo a una que tenga 10 discos o más. Si están todas llenas o quieres crear una nueva, introduce -1"));
        
        /* Si el número de la estantería es negativo o superior a la longitud de la colección se devuelve nada para salir de esta función */
        if (estanteria==-1) {
            let estanteria_nueva=[];
            estanteria=this.#estanterias.length;
            this.anadirEstanteria(estanteria_nueva);
            console.log("Se ha creado la estantería");
            this.listarEstanterias();
            estanteria=Number(prompt("Ahora introduce la estantería a la que quieres mover el disco, no puedes moverlo a una que tenga 10 discos o más"));
        }
        
        if (estanteria>=this.#estanterias.length || estanteria<0) {
            console.log("Introduce una estantería válida");
            return;
        }
        
        /* Este if comprueba si la estanteria tiene más the 10 discos */
        if (this.#estanterias[estanteria].length>=10) {
            let crear_estanteria=confirm("Has seleccionado una estantería con más de 10 discos, ¿quieres crear una estantería nueva e introducir el disco en ella?");
            if (crear_estanteria) {
                let estanteria_nueva=[];
                estanteria=this.#estanterias.length;
                this.anadirEstanteria(estanteria_nueva);
                console.log("Se ha creado la estantería");
                estanteria=this.#estanterias.length-1;
            }
            else {
                return;
            }  
        }
        
        /* Si no se ha cumplido ninguna de las condiciones anteriores, vamos a cambiar el disco de localización */
        this.#estanterias[estanteria].push(disco);

        console.log("Se ha actualizado la localización correctamente");

        /* Ahora eliminamos el disco de la estantería en la que estaba */

        for (let i=0; i < this.#estanterias.length; i++) {
            let indice_borrar = this.#estanterias[i].indexOf(disco);
            if (indice_borrar !== -1) {
                this.#estanterias[i].splice(indice_borrar, 1);
                return;
            }
        }

        /* La propiedad "localizacion" de la clase disco, se actualizará automáticamente al salir de esta función */
    }

    /* Este método devuelve el array de una estantería */

    devolverEstanteria(estanteria) {
        return this.#estanterias[estanteria];
    }
}