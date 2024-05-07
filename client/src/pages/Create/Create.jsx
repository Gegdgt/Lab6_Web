import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

function Create() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const creation_date = new Date().toISOString();
        const creator_id = localStorage.getItem('user_id');
        console.log(creator_id);
        const video_id = Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) + 10000000000000;
        const views = 0;
        const video = {
            video_id,
            name,
            duration: parseFloat(duration), 
            views,
            url,
            creation_date,
            creator_id,
            description
          };
          
        try {
            await axios.post('https://hdt-6-backend.vercel.app/videos', video);
            alert('Video created successfully');
        } catch (error) {
            console.error('Error creating video:', error);
            alert('Error creating video');
        }
    };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Duración:
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label>
                Descripción:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                URL:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </label>
            <button type="submit">Create Video</button>
        </form>
    );
}

export default Create;
