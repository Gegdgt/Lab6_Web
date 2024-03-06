import { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userdefimage from '../../img/userdef.jpg';
import videodefimage from '../../img/videodef.jpg';
import EditVideo from './editVideo.jsx';

function User() {
    const [showEditButton, setShowEditButton] = useState(false);
    const [showInitialInfo, setShowInitialInfo] = useState(true);
    const [editingVideo, setEditingVideo] = useState(null);
    const username = localStorage.getItem('username');
    const [user, setUser] = useState({
        name: username || 'Random Name',
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
                            console.error('Unexpected server response:', response.data);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching videos', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching user', error);
            });
    }, [username]);

    function editClick(video) {
        console.log('Editing video:', video); // Add this line
        if (showInitialInfo == true) {
          setEditingVideo(video); // Set the video to be edited
          setShowEditButton(true);
          setShowInitialInfo(false);
        } else {
          setEditingVideo(null); // Clear the video to be edited
          setShowEditButton(false);
          setShowInitialInfo(true); 
        }
      }

      function deleteClick(video) {
        const confirmDelete = window.confirm('Are you sure you want to delete this video?');
        if (confirmDelete) {
            axios.delete(`http://localhost:5050/videos/${video.video_id}`)
                .then(response => {
                    console.log('Video deleted:', response.data);
                    // Remove the deleted video from the videos array
                    setVideos(videos.filter(v => v._id !== video._id));
                })
                .catch(error => {
                    console.error('Error deleting video:', error);
                });
        }
    }

    return (
        <div className="user-container">
            <div className="profile-info">
                <img className='profile-image' src={user.imageUrl || userdefimage} alt="User profile" />
                <h2>{user.name}</h2>

                <p>{user.isCreator ? 'Creator' : 'Not a creator'}</p>
            </div>
            <div className="videos">
                {videos.map(video => (
                    <div key={video._id} className="video-card">
                        <Link to={`/video/${video.video_id}`}>
                            <img className='video-thumbnail' src={video.imageUrl || videodefimage} alt="Video thumbnail" />
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