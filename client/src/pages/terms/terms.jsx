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
        axios.post('https://hdt-6-backend.vercel.app/acceptTerms', {
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
        axios.post('https://hdt-6-backend.vercel.app/acceptTerms', {
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
    const termsAndConditions = (
        <div>
            <p>
                Bienvenido a nuestra plataforma de videos. Al utilizar nuestros servicios, usted acepta los siguientes términos y condiciones:
            </p>
            <ol>
                <li>Uso del Servicio: Usted acepta utilizar nuestro servicio solo con fines legales y de acuerdo con estos términos.</li>
                <li>Contenido del Usuario: Usted es responsable del contenido que publique en nuestra plataforma.</li>
                <li>Privacidad: Respetamos su privacidad. Consulte nuestra política de privacidad para obtener más información.</li>
                <li>Modificaciones: Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.</li>
                <li>Responsabilidades del Usuario: Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</li>
                <li>Restricciones de Uso: No debe utilizar nuestro servicio de manera que pueda dañar, deshabilitar, sobrecargar o perjudicar la plataforma.</li>
                <li>Límites de Responsabilidad: No seremos responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo.</li>
                <li>Indemnización: Usted acepta indemnizarnos y eximirnos de cualquier responsabilidad frente a reclamaciones, daños, pérdidas, etc.</li>
                <li>Legislación Aplicable: Estos términos se rigen e interpretan de acuerdo con las leyes del estado de California.</li>
                <li>Resolución de Disputas: Cualquier disputa relacionada con estos términos se resolverá mediante negociaciones de buena fe.</li>
                <li>Acuerdo Completo: Estos términos y condiciones constituyen el acuerdo completo entre usted y nosotros con respecto a nuestro servicio.</li>
                <li>Renuncia: Nuestra falta de acción frente a una violación de estos términos no constituirá una renuncia a nuestros derechos legales.</li>
                <li>Divisibilidad: Si alguna disposición de estos términos se considera inválida, las demás disposiciones seguirán en pleno vigor.</li>
            </ol>
            <p>
                Al hacer clic en "Aceptar", usted acepta estos términos y condiciones.
            </p>
        </div>
    );

    return (
        <div className="main-container">
            <div className="terms-card">
                <div className="terms-content">
                    <h2>Términos y Condiciones</h2>
                    {termsAndConditions}
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
