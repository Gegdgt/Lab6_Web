import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import videodefimage from '../../img/videodef.jpg';
import './Video.css';

function Video() {
    const { video_id } = useParams();
    const [video, setVideo] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [viewIncremented, setViewIncremented] = useState(false); // Nuevo estado para rastrear si la vista ya ha sido incrementada

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const submitComment = () => {
        const newComment = {
            user: username,
            date: new Date().toISOString(),
            comment_text: commentText
        };

        // Log the comment before sending to server
        console.log('New Comment:', newComment);

        // Add the new comment to the existing list of comments
        setComments([...comments, newComment]);

        // Clear the comment text area
        setCommentText('');

        // Send the new comment to the server
        axios.post(`http://localhost:5050/videos/${video_id}/comments`, newComment)
            .then(response => {
                console.log('Comment added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:5050/videos/${video_id}`)
            .then(response => {
                setVideo(response.data);
                setComments(response.data.comments ? response.data.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse() : []);
                console.log('Video views before increment:', response.data.views);
                if (!viewIncremented) {
                    axios.put(`http://localhost:5050/videos/${video_id}/view`, {}, { params: { views: response.data.views + 1 } }) // Incrementar views en 1
                        .then(response => {
                            setViewIncremented(true); // Marcar que la vista ha sido incrementada
                        })
                        .catch(error => {
                            console.error('Error incrementing view count:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching video', error);
            });
    }, [video_id, viewIncremented]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-container">
            <div className="video-card">
                <img className='video-thumbnail' src={video.imageUrl || videodefimage} alt="Miniatura de video" />
                <div className="video-details">
                    <h1>{video.name}</h1>
                    <p>Descripción: {video.description}</p>
                    <p>Duración: {video.duration} minutes</p>
                    <p>Fecha: {new Date(video.creation_date).toLocaleDateString()}</p>
                    <p>Views: {video.views}</p>
                    <button onClick={toggleComments} className="comment-toggle-button">
                        {showComments ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
                    </button>
                </div>
            </div>
            {showComments && (
                <div className="comments-section">
                    <h2>Comentarios:</h2>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>Usuario: {comment.user}</p>
                            <p>Fecha: {new Date(comment.date).toLocaleDateString()}</p>
                            <p>Comentario: {comment.comment_text}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className={`comment-form ${showComments ? 'hidden' : ''}`}>
                <textarea
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Escribe tu comentario aquí..."
                />
                <button onClick={submitComment} className="comment-toggle-button">
                    Enviar Comentario
                </button>
            </div>
        </div>
    );
}

export default Video;
