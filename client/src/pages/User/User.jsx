import { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userdefimage from '../../img/userdef.jpg';
import videodefimage from '../../img/videodef.jpg';
import EditVideo from './editVideo.jsx';

function User() {
    const [showEditButton, setShowEditButton] = useState(false); // Mostrar botón de edición
    const [showInitialInfo, setShowInitialInfo] = useState(true); // Mostrar información inicial
    const [editingVideo, setEditingVideo] = useState(null); // Editar video
    const username = localStorage.getItem('username');
    const [user, setUser] = useState({
        name: username || 'Nombre Aleatorio',
        isCreator: true,
        imageUrl: ''
    });
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/user?username=${username}`)
            .then(response => {
                const userId = response.data.user_id;
                axios.get(`http://localhost:5050/videosByCreator?creator=${userId}`)
                    .then(response => {
                        if (Array.isArray(response.data)) {
                            console.log(response.data);
                            setVideos(response.data);
                        } else {
                            console.error('Respuesta inesperada del servidor:', response.data);
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener los videos', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener el usuario', error);
            });
    }, [username]);

    function editClick(video) {
        console.log('Editando video:', video); // Agregar esta línea
        if (showInitialInfo === true) {
          setEditingVideo(video); // Establecer el video a editar
          setShowEditButton(true);
          setShowInitialInfo(false);
        } else {
          setEditingVideo(null); // Limpiar el video a editar
          setShowEditButton(false);
          setShowInitialInfo(true); 
        }
      }

      function deleteClick(video) {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este video?');
        if (confirmDelete) {
            axios.delete(`http://localhost:5050/videos/${video.video_id}`)
                .then(response => {
                    console.log('Video eliminado:', response.data);
                    // Eliminar el video eliminado del array de videos
                    setVideos(videos.filter(v => v._id !== video._id));
                })
                .catch(error => {
                    console.error('Error al eliminar el video:', error);
                });
        }
    }

    return (
        <div className="user-container">
            <div className="profile-info">
                <img className='profile-image' src={user.imageUrl || userdefimage} alt="Perfil de usuario" />
                <h2>{user.name}</h2>

                <p>{user.isCreator ? 'Creador' : 'No es creador'}</p>
            </div>
            <div className="videos">
                {videos.map(video => (
                    <div key={video._id} className="video-card">
                        <Link to={`/video/${video.video_id}`}>
                            <img className='video-thumbnail' src={video.imageUrl || videodefimage} alt="Miniatura de video" />
                        </Link>
                        <Link to={`/video/${video.video_id}`}>
                            <h3>{video.name}</h3>
                        </Link>
                        <div className="pagination">
                            <button onClick={() => editClick(video)}>Editar</button>
                            <button onClick={() => deleteClick(video)}>Borrar</button>
                        </div>
                    </div>
                    
                ))}
                {showEditButton && (
                <EditVideo
                    video={editingVideo}
                    recommendations={videos}
                    onVideoClick={editClick}
                    setShowEditButton={setShowEditButton}
                    setShowInitialInfo={setShowInitialInfo}
                />
                )}
            </div>
        </div>
    );
}

export default User;
