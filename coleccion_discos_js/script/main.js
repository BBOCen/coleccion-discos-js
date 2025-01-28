"use strict";

import { Coleccion } from "./coleccion.js";
import { Disco } from "./disco.js";
import { Autor } from "./autor.js"; 

/* Main */

let salir=false;

/* Creamos los autores y los ponemos en un array */

let autor1=new Autor("Queen", "1970-01-01");
let autor2=new Autor("Rolling Stones", "1960-01-01");
let autor3=new Autor("Everly Brothers", "1950-01-01");
let autor4=new Autor("Maroon 5", "2000-01-01");

let autores=[autor1, autor2, autor3, autor4];

/* Creamos los discos y los precargamos a la estanteria */

/* La localización se inicializa como 0, ya que no se sabe donde se va a guardar el disco
después, un método obtendrá la localización y lo actualizará automáticamente al iniciar
el menú */

let array_discos1 = [
    new Disco("A Night at the Opera", autor1.id, "1975-11-21", "CD", "No Prestado", 0),
    new Disco("The Game", autor1.id, "1980-06-30", "Vinilo", "Prestado", 0),
    new Disco("Sticky Fingers", autor2.id, "1971-04-23", "CD", "No Prestado", 0),
    new Disco("Exile on Main St.", autor2.id, "1972-05-12", "Vinilo", "No Prestado", 0),
    new Disco("All I Have to Do Is Dream", autor3.id, "1958-03-10", "Vinilo", "Prestado", 0),
    new Disco("Wake Up Call", autor4.id, "2004-10-05", "CD", "No Prestado", 0),
    new Disco("Bohemian Rhapsody", autor1.id, "1975-10-31", "Vinilo", "No Prestado", 0),
    new Disco("Let It Bleed", autor2.id, "1969-12-05", "CD", "Prestado", 0),
    new Disco("Cathy's Clown", autor3.id, "1960-04-01", "Vinilo", "No Prestado", 0),
    new Disco("Moves Like Jagger", autor4.id, "2011-06-21", "Vinilo", "No Prestado", 0),
];

let array_discos2 = [
    new Disco("News of the World", autor1.id, "1977-10-28", "CD", "No Prestado", 0),
    new Disco("Tattoo You", autor2.id, "1981-08-24", "Vinilo", "Prestado", 0),
    new Disco("The Everly Brothers' Best", autor3.id, "1958-12-15", "CD", "No Prestado", 0),
    new Disco("Songs About Jane", autor4.id, "2002-06-25", "Vinilo", "Prestado", 0),
    new Disco("Innuendo", autor1.id, "1991-02-04", "CD", "No Prestado", 0),
    new Disco("Out of Our Heads", autor2.id, "1965-07-30", "Vinilo", "No Prestado", 0),
    new Disco("The Fabulous Everly Brothers", autor3.id, "1958-07-01", "CD", "Prestado", 0),
    new Disco("V", autor4.id, "2014-09-29", "Vinilo", "No Prestado", 0),
    new Disco("Jazz", autor1.id, "1978-11-10", "CD", "No Prestado", 0),
    new Disco("Bridges to Babylon", autor2.id, "1997-09-29", "Vinilo", "Prestado", 0)
];

let coleccion=new Coleccion();

coleccion.precargarDosEstanterias(array_discos1, array_discos2);

/* Menú */

while(!salir) {
    /* Este código sirve para añadir al array de discos publicados todos los discos de la colección, si ya están, no se añaden */
    autor1.anadirDiscosPublicados(coleccion, autores);
    
    /* Este código actualiza la localización de los discos, ya que por defecto es 0 */
    array_discos1[1].actualizarLocalizacion(coleccion);
    
    let opcion=prompt("Selecciona una opción: \n1. Agregar disco \n2. Mostrar discos \n3. Borrar disco \n4. Prestar disco \n5. Actualizar localización \n6. Listar autores \n7. Listar autor y sus discos \n8. Salir");
    
    /* Agregar disco */
    if (opcion==1) {
        let disco=array_discos1[1].generarDisco(autores, coleccion);
        /* Este método añadirá el nuevo disco a la última estanteria que tiene menos de 10 discos, si no, creará uno nuevo */
        coleccion.anadirDiscoEstanteria(disco);
    }

    /* Mostrar discos */
    else if (opcion==2) {
        array_discos1[1].mostrarDiscos(coleccion, autores);
    }

    /* Borrar disco */
    else if (opcion == 3) {
        coleccion.listarEstanterias();
        let numero_estanteria = Number(prompt("Introduce el número de la estantería que quieres acceder para eliminar el disco de él: "));
        
        if (numero_estanteria >= 0 && numero_estanteria < coleccion.length) {
            coleccion.listarDiscosEstanteria(numero_estanteria);
            let eliminar = Number(prompt("De esta estantería, ¿qué disco quieres eliminar (introduce el segundo valor de la coordenada de localización (X,Y))?"));
            
            if (eliminar >= 0 && eliminar < coleccion.longitudEstanteria(numero_estanteria)) {
                coleccion.borrarDisco(numero_estanteria, eliminar);
            } else {
                console.log("Opcion inválida, tiene que ser entre 0 y la longitud de la estantería");
            }
        } else {
            console.log("Opcion inválida, tiene que ser entre 0 y la longitud de la colección");
        }
    }
    
    /* Prestar disco */
    else if (opcion == 4) {
        coleccion.listarEstanterias();
        let numero_estanteria = Number(prompt("Introduce el número de la estantería que quieres acceder para prestar el disco: "));
        
        if (numero_estanteria >= 0 && numero_estanteria < coleccion.length) {
            coleccion.listarDiscosEstanteria(numero_estanteria);
            let prestar = Number(prompt("De esta estantería, ¿qué disco quieres prestar (solo puedes prestar uno que no esté prestado) (introduce el segundo valor de la coordenada de localización (X,Y))?"));
    
            if (prestar >= 0 && prestar < coleccion.longitudEstanteria(numero_estanteria)) {
                let disco = coleccion.devolverDisco(numero_estanteria, prestar);
                
                if (disco.estado.toLowerCase() === "prestado") {
                    console.log("Este disco ya está prestado");
                } else {
                    coleccion.prestarDisco(numero_estanteria, prestar);
                }
            } else {
                console.log("Opción inválida, tiene que ser entre 0 y la longitud de la estantería");
            }
        } else {
            console.log("Opción inválida, tiene que ser entre 0 y la longitud de la colección");
        }
    }

    /* Actualizar localizacion */
    else if (opcion==5) {
        coleccion.actualizarLocalizacion();
    }

    /* Listar autores */
    else if (opcion==6) {
        autores[1].listarAutores(autores);
    }

    /* Listar un autor y sus discos */
    else if (opcion==7) {
        autores[1].listarAutorDiscos(autores);
    }

    /* Salir del menú */
    else if (opcion==8) {
        alert("Has salido del menú");
        salir=true;
    }
}