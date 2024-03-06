import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './search.css';
import Maindefimage from '../../img/maindef.jpg';

function Main() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const pageSize = 10;
        axios.get(`http://localhost:5050/videos?page=${page}&pageSize=${pageSize}`)
            .then(response => {
                const fetchedVideos = response.data;
                const videosWithCreators = fetchedVideos.map(video => {
                    video.duration = Math.round(video.duration / 60);
                    return video;
                });
                setVideos(videosWithCreators);
            })
            .catch(error => {
                console.error('Error fetching videos', error);
            });
    }, [page]);

    const filteredVideos = videos.filter(video =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-container">
            <input
                className="buscar"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="video-grid">
                {filteredVideos.map(video => (
                    <div key={video._id} className="video-card">
                        <img className='miniature' src={video.imageUrl || Maindefimage} alt="Miniatura de video" />
                        <Link to={`/video/${video.video_id}`}>
                            <h3>{video.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );}

export default Main;
