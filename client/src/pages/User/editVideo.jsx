import { useState, useEffect } from 'react';
import axios from 'axios';
import './editVideo.css'; 

function EditVideo({ video, recommendations, setShowEditButton, setShowInitialInfo }) {
    const [editedVideo, setEditedVideo] = useState(video);

    useEffect(() => {
        setEditedVideo(video);
    }, [video]);
  
    const handleInputChange = (event) => {
      setEditedVideo({
        ...editedVideo,
        [event.target.name]: event.target.value
      });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(editedVideo.video_id);
            const response = await axios.put(`https://hdt-6-backend.vercel.app/videos/${editedVideo.video_id}`, editedVideo);
            console.log(response.data);
            window.location.reload();
            setShowEditButton(false);
            setShowInitialInfo(true);
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };
  
    if (!video) {
      return null;
    }
  
    return (
      <form className="edit-video-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={editedVideo.name} onChange={handleInputChange} autoComplete="name" />
        </label>
        <button type="submit">Save</button>
      </form>
    );
}

export default EditVideo;
