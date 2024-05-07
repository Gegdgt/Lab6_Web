import serverless from "serverless-http";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signin = require('./routes/signin.js');
const Video = require('./routes/home.js');
const Comment = require('./routes/comment.js');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://GabrielGarcia:G1234567@proyecto1.yjyznsb.mongodb.net/Proyecto');

app.use('/login', (req, res) => {
  const { username, password } = req.body;
  signin.findOne({ username: username })
    .then(Usuarios => {
      if (Usuarios) {
        if (Usuarios.password === password) {
          res.json({
            message: "Completado",
            user_id: Usuarios.user_id,
            is_creator: Boolean(Usuarios.is_creator) // añade is_creator a la respuesta
          });
        } else {
          res.json({ message: 'contraseña invalida' });
        }
      } else {
        res.json({ message: 'El usuario no existe' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error interno del servidor' });
      console.error(error);
    });
});

app.use('/signin', (req, res) => {
  signin.create(req.body)
  .then(Usuarios => res.json(Usuarios))
  .catch(err => res.json(err))
});

app.post('/acceptTerms', (req, res) => {
  const { username, accept } = req.body;

  signin.findOneAndUpdate(
    { username: username },
    { $set: { is_creator: accept } },
    { new: true }
  )
  .then(updatedUser => {
    if (!updatedUser) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.json(updatedUser);
  })
  .catch(error => {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar usuario');
  });
});


app.delete('/videos/:videoId', (req, res) => {
  const videoId = req.params.videoId;

  Video.findOneAndDelete({ video_id: videoId })
    .then(deletedVideo => {
      if (!deletedVideo) {
        return res.status(404).send('Video no encontrado');
      }

      res.send('Video eliminado exitosamente');
    })
    .catch(error => {
      console.error('Error al eliminar video:', error);
      res.status(500).send('Error al eliminar video');
    });
});

//Editar solo el nombre
app.put('/videos/:video_id', (req, res) => {
  const video_id = req.params.video_id;
  const newVideoData = req.body;
  
  Video.findOneAndUpdate({ video_id: video_id }, newVideoData, { new: true })
    .then(updatedVideo => {
      if (!updatedVideo) {
        return res.status(404).send('Video no encontrado');
      }

      res.send(updatedVideo);
    })
    .catch(error => {
      console.error('Error al actualizar video:', error);
      res.status(500).send('Error al actualizar video');
    });
});

app.get('/videos/:videoId', (req, res) => {
  const videoId = req.params.videoId;

  Video.findOne({ video_id: videoId })
    .then(video => {
      if (!video) {
        return res.status(404).send('Video no encontrado');
      }

      res.send(video);
    })
    .catch(error => {
      console.error('Error al obtener el video', error);
      res.status(500).send('Error al obtener el video');
    });
});

app.post('/videos', (req, res) => {
  const video = new Video(req.body);

  video.save()
    .then(() => {
      res.status(201).send('Video creado exitosamente');
    })
    .catch(error => {
      console.error('Error al crear el video:', error);
      res.status(500).send('Error al crear el video');
    });
});

// Nueva ruta para obtener videos
app.use('/videos', (req, res) => {
  const page = Number(req.query.page) || 1; // Obtener la página de los parámetros de consulta o establecerla en 1 por defecto
  const pageSize = Number(req.query.pageSize) || 10; // Obtener el tamaño de página de los parámetros de consulta o establecerlo en 10 por defecto

  Video.find({})
    .skip((page - 1) * pageSize) // Saltar los videos de las páginas anteriores
    .limit(pageSize) // Limitar el número de videos al tamaño de página
    .then(videos => {
      return Promise.all(videos.map(video => {
        return signin.findOne({ user_id: video.creator_id })
          .then(user => {
            video = video.toObject();
            video.creatorName = user.name;
            return video;
          });
      }));
    })
    .then(videosWithCreators => res.json(videosWithCreators))
    .catch(err => res.json(err));
});

app.use('/videosByCreator', (req, res) => {
  const creator = req.query.creator;

  Video.find({ creator_id: creator }) // Filtrar videos por creator_id
    .then(videos => {
      return Promise.all(videos.map(video => {
        return signin.findOne({ user_id: video.creator_id })
          .then(user => {
            video = video.toObject();
            video.creatorName = user.name;
            return video;
          });
      }));
    })
    .then(videosWithCreators => res.json(videosWithCreators))
    .catch(err => {
      console.error(err);
      res.json([]); // Responder con un array vacío si ocurre un error
    });
});

// Nueva ruta para obtener un usuario por ID
app.use('/user', (req, res) => {
  const username = req.query.username;

  signin.findOne({ username: username }) // Encontrar usuario por username
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/videos/:videoId/comments', (req, res) => {
  const { videoId } = req.params;
  const { user, date, comment_text } = req.body;

  // Crear el nuevo comentario
  const newComment = {
    user,
    date,
    comment_text
  };

  // Agregar el comentario al video
  Video.findOneAndUpdate(
    { video_id: videoId }, // Encuentra el video por ID
    { $push: { comments: newComment } }, // Agrega el comentario
    { new: true } // Devuelve el documento actualizado
  )
  .then(updatedVideo => {
    if (!updatedVideo) {
      return res.status(404).send('Video no encontrado');
    }
    res.status(201).send(updatedVideo);
  })
  .catch(error => {
    console.error('Error al añadir comentario:', error);
    res.status(500).send('Error al añadir comentario');
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
