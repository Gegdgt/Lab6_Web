import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';
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
            <div className="blog-section">
                <h2>Blog de Videos de Programación</h2>
                <div className="blog-content">
                    <div className="blog-item">
                        <h3>Introducción a la Programación</h3>
                        <p>Descubre los conceptos básicos de la programación y cómo comenzar tu viaje en el mundo del desarrollo de software.</p>
                    </div>
                    <div className="blog-item">
                        <h3>Aprende JavaScript desde Cero</h3>
                        <p>Domina uno de los lenguajes de programación más populares y poderosos para crear aplicaciones web interactivas.</p>
                    </div>
                    <div className="blog-item">
                        <h3>Introducción a React</h3>
                        <p>Descubre el framework de JavaScript más popular para construir interfaces de usuario modernas y eficientes.</p>
                    </div>
                    <div className="blog-item">
                        <h3>Construyendo una API con Node.js</h3>
                        <p>Aprende a crear una API RESTful utilizando Node.js y Express para construir aplicaciones web escalables y robustas.</p>
                    </div>
                </div>
            </div>
        </div>
    );}

export default Main;