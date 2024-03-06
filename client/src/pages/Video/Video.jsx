import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import videodefimage from '../../img/videodef.jpg';
import './Video.css';

function Video() {
    const { video_id } = useParams();
    const [video, setVideo] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    useEffect(() => {
        axios.get(`http://localhost:5050/videos/${video_id}`)
            .then(response => {
                setVideo(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching video', error);
            });
    }, [video_id]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-container">
            <div className="video-card">
                <img className='video-thumbnail' src={video.imageUrl || videodefimage} alt="Miniatura de video" />
                <div className="video-details">
                    <h1>{video.name}</h1>
                    <p>Duration: {video.duration} minutes</p>
                    <p>Creation date: {new Date(video.creation_date).toLocaleDateString()}</p>
                    <p>Views: {video.views}</p>
                    <button onClick={toggleComments} className="comment-toggle-button">
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    {showComments && (
                        <div className="comments-section">
                            <h2>Comments:</h2>
                            {video.comments && video.comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>User: {comment.user}</p>
                                    <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                                    <p>Comment: {comment.comment_text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Video;
