import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ModalWindow = ({ isOpen, onClose, onLoginSuccess, openRegisterModal }) => {

    const [loginError, setLoginError] = useState(false);

    const handleCloseClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);


        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError(false);

        const email = event.target.email.value;
        const password = event.target.password.value;

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.user.nickname);
            localStorage.setItem('id_usuario', data.user.id_usuario);
            localStorage.setItem('fotoPerfilUrl', data.user.foto_perfil_url);
            onLoginSuccess();
            onClose();
        } else {
            console.error("Inicio de sesión fallida:", data.error);
            setLoginError(true);
        }
    }
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={handleCloseClick}>
            <div className="modal-content">

                <div className='modal-header'>
                    <h2 className='modal-title'>
                        <span className="icon">
                            <i className="bi bi-person-circle"></i>
                        </span>
                        Entra en NexoGamer</h2>
                    <button className="close-button" onClick={onClose} aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <form className='form-login' onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input type="email" name="email" required />

                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" name="password" required />
                        {loginError && <div className="error-message">Correo electrónico o contraseña incorrecta</div>}
                    </div>
                    <div className="form-group action-group">
                        <button className="login-btn" type="submit">Iniciar Sesión</button>
                    </div>
                    <hr />
                    <div className="modal-footer-container">
                        <h3 className='modal-footer'>Regístrate aquí</h3>
                        <button className='btn-register' onClick={openRegisterModal}>Registrarse</button>
                    </div>
                </form>



            </div>
        </div>
    );
};
