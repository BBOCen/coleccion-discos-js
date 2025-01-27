🎵 Gestión de Colección de Discos Musicales 🎵

Este proyecto es una aplicación en JavaScript que simula la gestión de una colección de discos musicales. No está diseñado para la reproducción de música, sino para la gestión de información mediante la introducción de datos por consola. La aplicación permite a los usuarios organizar, buscar y administrar su colección de discos de manera sencilla e intuitiva a través de una interfaz basada en consola.

🚀 Funcionalidades principales:
Gestión de discos:

  -Agregar nuevos discos mediante prompts interactivos.
  -Mostrar discos filtrados por tipo de música, orden de publicación (ascendente/descendente), ubicación o intervalo de tiempo.
  -Eliminar discos de la colección.
  -Prestar discos, siempre que estén disponibles.
  
Organización de la colección:

  -Cada estantería tiene un límite de 10 discos; si está llena, se permite crear una nueva.
  -Actualización de la ubicación de los discos entre estanterías.

Administración de autores:

  -Listado de autores con sus discos publicados.
  
Extras:

  -Función de pre-carga con 20 discos iniciales para facilitar las pruebas.
  -Opción de terminar la ejecución en cualquier momento.

🛠️ Estructura del proyecto
El proyecto está estructurado en tres clases principales:

  Clase Autor:
  
  -Almacena el nombre, fecha de nacimiento y discos publicados.
    
  Clase Disco:
  
  -Contiene información sobre el disco, incluyendo su nombre, autor, fecha de publicación, tipo de música, estado (prestado/disponible) y ubicación dentro de la colección.
    
  Clase Coleccion:
  
  -Maneja la lista de estanterías y la capacidad de almacenamiento (máximo 10 discos por estantería).
