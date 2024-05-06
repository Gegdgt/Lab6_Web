import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext'; 
import './terms.css';

function Terms() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const { login } = useUser();

    // Función para enviar la solicitud al aceptar los términos
    const handleAccept = () => {
        axios.post('http://localhost:5050/acceptTerms', {
            username: username,
            accept: true
        })
        .then(response => {
            console.log(response.data);
            login(username, response.data.is_creator);
            navigate('/');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Función para enviar la solicitud al rechazar los términos
    const handleReject = () => {
        axios.post('http://localhost:5050/acceptTerms', {
            username: username,
            accept: false
        })
        .then(response => {
            console.log(response.data);
            navigate('/');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    // Contrato de términos y condiciones (inventado)
    const termsAndConditions = `
    Bienvenido a nuestra plataforma de videos. Al utilizar nuestros servicios, usted acepta los siguientes términos y condiciones:\n        
    1. Uso del Servicio: Usted acepta utilizar nuestro servicio solo con fines legales y de acuerdo con estos términos.\n        
    2. Contenido del Usuario: Usted es responsable del contenido que publique en nuestra plataforma.\n        
    3. Privacidad: Respetamos su privacidad. Consulte nuestra política de privacidad para obtener más información.\n        
    4. Modificaciones: Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.\n        
    Al hacer clic en "Aceptar", usted acepta estos términos y condiciones.\n
`;

    return (
        <div className="main-container">
            <div className="terms-card">
                <div className="terms-content">
                    <h2>Términos y Condiciones</h2>
                    <p>{termsAndConditions}</p>
                </div>
                <div className="buttons-container">
                    <button className="accept-button" onClick={handleAccept}>Aceptar</button>
                    <button className="reject-button" onClick={handleReject}>Rechazar</button>
                </div>
            </div>
        </div>
    );
}

export default Terms;
