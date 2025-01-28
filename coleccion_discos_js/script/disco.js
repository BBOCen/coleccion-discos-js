"use strict";

export class Disco {
    #id;
    #nombre;
    #autor;
    #fecha_publicacion;
    #tipo;
    #estado;
    #localizacion;
    static id_gen=0;

    /* La propiedad autor es la ID del autor */
    constructor(nombre, autor, fecha_publicacion, tipo, estado, localizacion) {
        this.#id=Disco.id_gen++;
        this.#nombre=nombre;
        this.#autor=autor;
        this.#fecha_publicacion=fecha_publicacion;
        this.#tipo=tipo;
        this.#estado=estado;
        this.#localizacion=localizacion;
    }

    /* Getters y setters */

    get id() {
        return this.#id;
    }
    
    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        this.#nombre = valor;
    }

    get autor() {
        return this.#autor;
    }

    set autor(valor) {
        this.#autor = valor;
    }

    get fecha_publicacion() {
        return this.#fecha_publicacion;
    }

    set fecha_publicacion(valor) {
        this.#fecha_publicacion = valor;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(valor) {
        this.#tipo = valor;
    }

    get estado() {
        return this.#estado;
    }

    set estado(valor) {
        this.#estado = valor;
    }

    get localizacion() {
        return this.#localizacion;
    }

    set localizacion(valor) {
        this.#localizacion = valor;
    }

    /* Otros métodos */

    /* Este método es el encargado de generar un disco nuevo y luego insertarlo en la colección */

    generarDisco(autores, coleccion) {
        let nombre=prompt("Introduce el nombre del disco: ");
        
        let salir=false;
        let id_autor=0;
        while (!salir) {
            autores[1].listarAutores(autores);
            id_autor=Number(prompt("Escoge la ID de uno de los autores que se han listado en la consola: "));
            let indice_autor=autores.findIndex(autor => autor.id==id_autor);
            if (indice_autor!=-1) {
                console.log("Se ha guardado correctamente el autor");
                salir=true;
            }
            else {
                console.log("Introduce un autor válido");
            }
        }

        let fecha_publicacion="";
        let fecha_valida=false;
        while(!fecha_valida) {
            fecha_publicacion=prompt("Introduce una fecha en este formato: AAAA-MM-DD");
            fecha_valida=this.esFechaValida(fecha_publicacion);
            if (!fecha_valida) {
                console.log("Introduce una fecha correcta");
            }
        }

        let tipo=prompt("Introduce el tipo de música del disco: ");
        let estado=false;
        let estado_entrada="";
        let salir2=false;
        while(!salir2) {
            estado_entrada=prompt("Introduce el estado del disco (teclea prestado/no prestado):");
            if (estado_entrada.toLowerCase()=="prestado" || estado_entrada.toLowerCase()=="no prestado") {
                if (estado_entrada!="prestado") {
                    salir2=true;
                    estado=true;
                }
                else {
                    salir2=true;
                    estado=false;
                }
            }
            else {
                console.log("Introduce una opción válida");;
            }
        }

        /* Al generar el disco, la localización solo va a almacenar la estantería en la que se va a meter, 
        ya depués otro método lo actualizará correctamente de manera automática al salir de esta función */

        let localizacion=coleccion.encontrarUltimaPosicion();

        return new Disco(nombre, id_autor, fecha_publicacion, tipo, estado, localizacion);

    }

    imprimirInformacion() {
        console.log("********* Información del Disco *********");
        console.log("ID: " + this.#id);
        console.log("Nombre: " + this.#nombre);
        console.log("ID del autor: " + this.#autor);
        console.log("Fecha de Publicación: " + this.#fecha_publicacion);
        console.log("Tipo: " + this.#tipo);
        console.log("Estado: " + this.#estado);
        console.log("Localización: " + this.#localizacion);
    }
    /* Este método actualiza las coordenadas en la propiedad "localización" del disco */
    actualizarLocalizacion(coleccion) {
        for (let i = 0; i < coleccion.length; i++) {
            for (let j = 0; j < coleccion.longitudEstanteria(i); j++) {
                let disco = coleccion.devolverDisco(i, j);
                disco.localizacion=`${i},${j}`;
            }
        }
    }

    /* Este método obtiene el nombre del autor usando su ID, ya que en disco solo se guarda la ID del autor */
    obtenerNombreAutor(id_autor, autores) {
        for (let autor of autores) {
            if (autor.id==id_autor) {
                return autor.nombre;
            }
        }
    }

    /* Este método recorre el array del resultado de búsqueda, luego imprime todo en el body del html, se concatena todo en un string
    para mostrarlo una sola vez, así se evitan problemas con que cada vez que se llame al método de escribir en el html en el body borre
    las entradas anteriores */
    imprimirResultadoBusqueda(resultado, autores) {
        let contenido_html = "<strong><h2>Lista de Discos</h2></strong><ul>";
        let estado_string="";
        for (let disco of resultado) {
            if (!disco.estado) {
                estado_string="No prestado";
            }
            else {
                estado_string="Prestado";
            }
            let nombre_autor=this.obtenerNombreAutor(disco.autor, autores);
            contenido_html += `<li>
            <strong>${disco.nombre}</strong> - ${nombre_autor} (${disco.fecha_publicacion})<br>
            ID: ${disco.id}<br>
            ID del autor: ${disco.autor}<br>
            Tipo: ${disco.tipo}<br>
            Estado: ${estado_string}<br>
            Localización: ${disco.localizacion}
        </li>`;
        }
        contenido_html += "</ul>";
        /* Este alert es muy importante, ya que si no se escribe, no saldrá la ventana nueva */
        alert("Se va a abrir una nueva ventana con los resultados. Tienes que darle a este sitio web permisos para que se abran pestañas emergentes");
        let nueva_ventana = window.open("", "_blank");
        nueva_ventana.document.body.innerHTML = contenido_html;
    }

    /* Este método devuelve un array de discos en función del tipo introducido */
    buscarTipo(coleccion, tipo) {
        let resultado=[];
        for (let i = 0; i < coleccion.length; i++) {
            for (let j = 0; j < coleccion.longitudEstanteria(i); j++) {
                let disco = coleccion.devolverDisco(i, j);
                if (disco.tipo==tipo) {
                    resultado.push(disco);
                }
            }
        }
        return resultado;

    }

    /* Este método obtiene todos los discos de la colección en un solo array */
    obtenerTodos(coleccion) {
        let resultado=[];
        for (let i = 0; i < coleccion.length; i++) {
            for (let j = 0; j < coleccion.longitudEstanteria(i); j++) {
                let disco = coleccion.devolverDisco(i, j);
                    resultado.push(disco);
            }
        }
        return resultado;
    }

    /* Este método devuelve el resultado de buscar los discos por un rango de fechas concreto */
    buscarFecha(coleccion, fecha_inferior, fecha_superior) {
        let resultado=[];
        for (let i = 0; i < coleccion.length; i++) {
            for (let j = 0; j < coleccion.longitudEstanteria(i); j++) {
                let disco = coleccion.devolverDisco(i, j);
                if (disco.fecha_publicacion>=fecha_inferior && disco.fecha_publicacion<=fecha_superior) {
                    resultado.push(disco);
                }
            }
        }
        return resultado;
    }
    
    /* Este método es el encargado de mostrar los discos según las opciones dadas */
    mostrarDiscos(coleccion, autores) {
        let opcion=Number(prompt("¿Cómo quieres listar los discos? \n1. Por tipo \n2. Por fecha de publición \n3. Por ubicación (por estantería) \n4. Intervalo de tiempo"));
        
        /* Tipo */
        if (opcion==1) {
            let tipo=prompt("Introduce el tipo de música que quieres buscar: ");
            let resultado=this.buscarTipo(coleccion, tipo, autores);
            if (resultado.length==0) {
                console.log("No hay resultados para esos parámetros de búsqueda");
            }
            else {
                this.imprimirResultadoBusqueda(resultado, autores);
            }
        }

        /* Fecha de publicación */
        else if (opcion==2) {
            let orden = prompt("¿Cómo quieres ordenar los discos por fecha de publicación? (ascendente/descendente): ").toLowerCase();
            let resultado = this.obtenerTodos(coleccion);
            
            if (resultado.length==0) {
                console.log("No hay resultados para esos parámetros de búsqueda");
            }
            
            else {
                if (orden=="ascendente") {
                    resultado.sort((a, b) => new Date(a.fecha_publicacion) - new Date(b.fecha_publicacion));
                } 
                
                else if (orden === "descendente") {
                    resultado.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
                } 
                
                else {
                    console.log("Opción inválida");
                    return;
                }
                this.imprimirResultadoBusqueda(resultado, autores);
            }
        }

        /* Se entiende que ubicación se refiere a listar los discos en función de una estantería en concreto */
        else if (opcion==3) {
            coleccion.listarEstanterias();
            let estanteria=Number(prompt("Escoge la estantería que quieres buscar: "));
            
            /* Verificamos que la entrada del usuario corresponde con una estantería */
            if (estanteria>=coleccion.length || estanteria<0) {
                console.log("Introduce una estantería válida");
                return;
            }
            else {
                let resultado=coleccion.devolverEstanteria(estanteria);
                if (resultado.length==0) {
                    console.log("No hay resultados para esos parámetros de búsqueda");
                }
                else {
                    this.imprimirResultadoBusqueda(resultado, autores);
                }
            }
        }

        /* Rango de fechas */
        else if (opcion==4) {
            let fecha_inferior="";
            let fecha_valida=false;
            
            while(!fecha_valida) {
                fecha_inferior=prompt("Vas a introducir la primera fecha, introdúcela en este formato: AAAA-MM-DD");
                fecha_valida=this.esFechaValida(fecha_inferior);
                if (!fecha_valida) {
                    console.log("Introduce una fecha correcta");
                }
            }
            
            let fecha_superior="";
            fecha_valida=false;
            
            while(!fecha_valida) {
                fecha_superior=prompt("Vas a introducir la segunda fecha, introdúcela en este formato: AAAA-MM-DD");
                fecha_valida=this.esFechaValida(fecha_superior);
                if (!fecha_valida) {
                    console.log("Introduce una fecha correcta");
                }
            }
            
            let resultado=this.buscarFecha(coleccion, fecha_inferior, fecha_superior);
            if (resultado.length==0) {
                console.log("No hay resultados para esos parámetros de búsqueda");
            }
            
            else {
                this.imprimirResultadoBusqueda(resultado, autores);
            }
        }
        else {
            console.log("Introduce una opción válida");
        }
    }

    /* Esta función verifica que la fecha introducida está en un formato válida */
    esFechaValida(fecha) {
        /* Usamos una expresion regular para verificar que la fecha introducida está en un formato válido */
        let formato_fecha = /^\d{4}-\d{2}-\d{2}$/;
        
        /* La testeamos, si no cumple el formato, la función devuelve false */
        if (!formato_fecha.test(fecha)) {
            return false;
        }

        /* Sino, se procede a crear el objeto fecha correspondiente */
        let objeto_fecha=new Date(fecha);
        
        /* Ahora solo nos queda verificar que la fecha sea válida, usamos esta función para verificarlo */
        /* Si isNaN nos devuelve true, es porque es una fecha inválida */
        if (isNaN(objeto_fecha.getTime())) {
            return false;
        }
       
        return true
    }
}
