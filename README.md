Readme     
Este laboratorio es un blog de videos, los cuales se han generado con data Fake, la base de datos esta hecha en Mongodb.
Se utilizaron varios endpoints que permiten listar, obtener detalles, crear, modificar y eliminar publicaciones Esta es la primera parte por lo que solo es necesario hacer el server, por lo que a pesar de haber hecho algo en el client, solo me enfocare en la explicacion del server.     


EndPoints     
Get/Post     
Este endpoint retorna un listado de todas las publicaciones disponibles en la base de datos. Retorna un array y un status 200 si se realizo correctamente.       

Get/posts/:postId           
Retorna el detalle de una publicación especifica identificada por postId. Debe retornar un objeto y un estatus 200 si la solicitud es exitosa.    

Post/post       
Permite crear una nueva publicación. Debe retornar un objeto con la publicación creada y un status 200 si la solicitud es exitosa.

Put/post/:postId                
Permite modificar una publicación existente identificada por postId. Retorna un objeto con la publicacion editada y un status 200 si la solicitud es exitosa.         

Delete/post/:postId            
Borra una publicacion identificada por postId. No retorna contenido y debe retornar status 204 si se borra con exito.



Base de datos               
La base utilizada fue MongoDB y esta estructurada en 3 colecciones:     

Usuarios
Contiene información sobre los usuarios registrados en la plataforma, como su nombre, nombre de usuario, contraseña, etc.

Videos
Almacena información sobre los videos publicados, como la URL, nombre, duración, etc. También contiene 
comentarios asociados a cada video.

Playlist
Guarda las listas de reproducción creadas por los usuarios, incluyendo el nombre de la lista y los videos que contiene.



Docker
El laboratorio está dockerizado para facilitar su implementación y ejecución. El archivo docker-compose.yml define dos servicios:

react-app: Para ejecutar la aplicación Node.js.
mongodb: Para ejecutar la base de datos MongoDB.

Ejecución
Para ejecutar la aplicación, primero asegúrese de tener Docker instalado en su sistema. Luego, clone el repositorio y ejecute el siguiente comando en la raíz del laboratorio:

docker-compose up

Esto levantará tanto la aplicación como la base de datos en contenedores Docker.




Documentación
La documentación de la base de datos se encuentra disponible utilizando Swagger. Puede acceder a ella una vez que la aplicación esté en funcionamiento visitando la ruta /api-docs.



Soporte CORS
La aplicación está configurada para admitir solicitudes CORS, lo que permite que los recursos de la base de datos sean accedidos desde diferentes orígenes de manera segura.



Comando npm lint
Se ha implementado un comando npm lint que utiliza ESLint para asegurarse de que el código no tenga errores de estilo. Se ha seguido la guía de estilo de Airbnb y se ha añadido una regla personalizada que prohíbe el uso de punto y coma en el código.



Manejo de Errores
Se han implementado adecuadamente los status de error 500 para manejar problemas al contactar con la base de datos o errores de código.
Se proporcionan estados de error 400 para manejar situaciones como visitar un endpoint no existente o enviar datos con formato incorrecto en los métodos PUT y POST.

