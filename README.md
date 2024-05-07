# Blog de Videos 

Este proyecto es un blog de videos con datos falsos generados para fines de prueba. La base de datos está impulsada por MongoDB.

Para ver la pagina en ejecucion, visite: https://mytubeone.netlify.app/

# Frontend

El proyecto tiene diferentes componentes hechos usando React + Vite para hacer funciones y CSS para darle algun tipo de diseño a la pagina.

Los diferentes componentes que tiene este proyecto son: 

- LogIn: Inicio de sesion
- SignIn: Creacion de usuarios
- terms: aceptacion de terminos de los usuarios para ser creadores
- video: Informacion de cada video
- user: La pagina del usuario con algunas de las opciones que maneja la base de datos, como lo es borrar y actualizar
- crear: El formulario que deja que los usuarios que son creadores, inserten los videos nuevos

Para manejar a los "Administradores" se les asigna un codigo de creador especifico. Solo los creadores tienen el permiso especial de insertar nuevos videos, asi como para eliminar (solo sus propios videos) y editarlos. Para poder ser creador, se debe precionar el boton de "Terminos" dentro de la pagina usando una cuenta nueva. Si se aceptan, el boton cambiara a Crear. Si no, se les regresa a la pagina principal.

Cualquier usuario puede ver la pagina para luego decidir si es que se quieren registrar o no, por esto mismo, si no se ha iniciado sesion o creado una cuenta, al entrar a la pagina, solo esos botones apareceran en la barra de navegación

# Backend

El servidor backend incluye varios endpoints que permiten listar, obtener detalles, crear, modificar y eliminar publicaciones de videos. Esta es la primera fase del proyecto, por lo que el enfoque se centra principalmente en el servidor, aunque se realizó algún trabajo inicial en el cliente.

## Endpoints

### GET /posts

Recupera una lista de todas las publicaciones disponibles en la base de datos. Devuelve un array de publicaciones y un código de estado 200 si se recupera correctamente.

### GET /posts/:postId

Recupera los detalles de una publicación específica identificada por \`postId\`. Devuelve un objeto que representa la publicación y un código de estado 200 si la solicitud tiene éxito.

### POST /post

Permite crear una nueva publicación. La solicitud debe contener los detalles de la publicación, y devuelve un objeto con la publicación creada y un código de estado 200 si la creación tiene éxito.

### PUT /post/:postId

Modifica una publicación existente identificada por \`postId\`. Devuelve un objeto con la publicación editada y un código de estado 200 si la modificación tiene éxito.

### DELETE /post/:postId

Elimina una publicación identificada por \`postId\`. No devuelve contenido y un código de estado 204 si la eliminación tiene éxito.

## Base de Datos

La base de datos utilizada es MongoDB, estructurada con tres colecciones:

### Usuarios

Contiene información sobre los usuarios registrados en la plataforma, como su nombre, nombre de usuario, contraseña, etc.

### Videos

Almacena información sobre los videos publicados, como la URL, el nombre, la duración, etc. También contiene comentarios asociados a cada video.

### Playlists

Contiene las listas de reproducción creadas por los usuarios, incluyendo el nombre de la lista y los videos que contiene.

## Docker

El proyecto está dockerizado para facilitar su configuración y ejecución. El archivo \`docker-compose.yml\` define dos servicios:

- **react-app**: Para ejecutar la aplicación Node.js.
- **mongodb**: Para ejecutar la base de datos MongoDB.

## Ejecución

Para ejecutar la aplicación, primero asegúrese de tener Docker instalado en su sistema. Luego, clone el repositorio y ejecute el siguiente comando en la raíz del proyecto:

```bash
docker-compose up
```

Esto levantará tanto la aplicación como la base de datos en contenedores Docker.

## Documentación

La documentación de la base de datos está disponible utilizando Swagger. Puede acceder a ella una vez que la aplicación esté en funcionamiento visitando la ruta \`/api-docs\`.

## Soporte CORS

La aplicación está configurada para admitir solicitudes CORS, lo que permite que los recursos de la base de datos sean accedidos desde diferentes orígenes de manera segura.

## Comando \`npm lint\`

Se ha implementado un comando \`npm lint\` que utiliza ESLint para asegurarse de que el código no tenga errores de estilo. Se ha seguido la guía de estilo de Airbnb y se ha añadido una regla personalizada que prohíbe el uso de punto y coma en el código.

## Manejo de Errores

Se han implementado adecuadamente los códigos de estado de error 500 para manejar problemas al contactar con la base de datos o errores de código. Se proporcionan códigos de estado 400 para manejar situaciones como visitar un endpoint no existente o enviar datos con formato incorrecto en los métodos PUT y POST.
