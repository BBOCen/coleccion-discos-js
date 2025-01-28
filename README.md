<h1>🎵 Gestión de Colección de Discos Musicales 🎵</h1>

<p>Este proyecto es una aplicación en JavaScript que simula la gestión de una colección de discos musicales. No está diseñado para la reproducción de música, sino para la gestión de información mediante la introducción de datos por consola. La aplicación permite a los usuarios organizar, buscar y administrar su colección de discos de manera sencilla e intuitiva a través de una interfaz basada en consola.</p>

<h2>🚀 Funcionalidades principales</h2>

<h3>Gestión de discos:</h3>
<ul>
  <li>Agregar nuevos discos mediante prompts interactivos.</li>
  <li>Mostrar discos filtrados por tipo de música, orden de publicación (ascendente/descendente), ubicación o intervalo de tiempo.</li>
  <li>Eliminar discos de la colección.</li>
  <li>Prestar discos, siempre que estén disponibles.</li>
</ul>

<h3>Organización de la colección:</h3>
<ul>
  <li>Cada estantería tiene un límite de 10 discos; si está llena, se permite crear una nueva.</li>
  <li>Actualización de la ubicación de los discos entre estanterías.</li>
</ul>

<h3>Administración de autores:</h3>
<ul>
  <li>Listado de autores con sus discos publicados.</li>
</ul>

<h3>Extras:</h3>
<ul>
  <li>Función de pre-carga con 20 discos iniciales para facilitar las pruebas.</li>
  <li>Opción de terminar la ejecución en cualquier momento.</li>
</ul>

<h2>🛠️ Estructura del proyecto</h2>

<p>El proyecto está estructurado en tres clases principales:</p>

<h3>Clase Autor:</h3>
<ul>
  <li>Almacena el nombre, fecha de nacimiento y discos publicados.</li>
</ul>

<h3>Clase Disco:</h3>
<ul>
  <li>Contiene información sobre el disco, incluyendo su nombre, autor, fecha de publicación, tipo de música, estado (prestado/disponible) y ubicación dentro de la colección.</li>
</ul>

<h3>Clase Coleccion:</h3>
<ul>
  <li>Maneja la lista de estanterías y la capacidad de almacenamiento (máximo 10 discos por estantería).</li>
</ul>

<h2>🚀 Cómo ejecutar la aplicación</h2>
Puedes ejecutar esta aplicación en este enlace: https://bbocen.github.io/coleccion-discos-js/coleccion_discos_js/index.html
