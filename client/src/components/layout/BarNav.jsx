import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import imagenLogo from '../../../public/logoWh.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ModalWindow } from '../pages/ModalWindow';
import { RegistroUsuarioModal } from '../pages/RegistroUsuarioModal';
import avatarDefault from '../../../public/avatarDefault.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const DropDownMenu = ({ items, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="dropbtn">{label}</button>
            {isOpen && (
                <div className="dropdown-content">
                    {items.map((item, index) => (
                        item.path ?
                            <NavLink to={item.path} key={index}>{item.label}</NavLink>
                            :
                            <a href="#" onClick={item.action} key={index}>{item.label}</a>
                    ))}
                </div>
            )}
        </div>
    );
};

export const BarNav = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const isLoggedIn = localStorage.getItem('userToken');
    const updateUserName = () => setUserName(localStorage.getItem('userName'));
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);


    const obtenerUrlAvatar = () => {
        const url = localStorage.getItem('fotoPerfilUrl');
        // Comprobar si url es una cadena no vacía y parece una URL válida
        if (url && url.trim() !== '' && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }
        return avatarDefault;
    };

    const avatarUrl = obtenerUrlAvatar();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        setUserName(null);
    }

    const intercambioItems = [
        { label: 'Juegos', path: '/intercambio/juegos' },
        { label: 'Consolas', path: '/intercambio/consolas' },
        { label: 'Accesorios', path: '/intercambio/accesorios' },
        /*{ label: 'Merchandising', path: '/intercambio/merchandasing' },*/
    ];

    const segundaManoItems = [
        { label: 'Juegos', path: "/segunda-mano/juegos" },
        { label: 'Consolas', path: '/segunda-mano/consolas' },
        { label: 'Accesorios', path: '/segunda-mano/accesorios' },
        /* { label: 'Merchandising', path: '/segunda-mano/merchandasing' },*/
    ];

    const perfilItems = [
        { label: 'Mis anuncios', path: '/MisAnuncios' },
        { label: 'Cerrar sesión', action: handleLogout },
        /* { label: 'Mi Perfil', path: '/perfil' },*/
        /* { label: 'Mis compras', path: '/compras' },*/
    ]

return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img src={imagenLogo} alt="Logo de NexoGamer" style={{ width: '120px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className='inicio-link' as={NavLink} to="/">Inicio</Nav.Link>
                    <DropDownMenu items={intercambioItems} label="Intercambio" />
                    <DropDownMenu items={segundaManoItems} label="2ª Mano" />
                </Nav>
                <Nav>
                    {!isLoggedIn ? (
                        <>
                            <Nav.Link onClick={openModal}>Iniciar Sesión</Nav.Link>
                            <Nav.Link onClick={openRegisterModal}>Registrarse</Nav.Link>
                        </>
                    ) : (
                        <NavDropdown title={
                            <>
                                <img src={avatarUrl || avatarDefault} alt="Avatar" className="avatar-icon" />
                                <span className="username">{userName}</span>
                            </>
                        } id="perfil-dropdown">
                            <NavDropdown.Item as={NavLink} to="/MisAnuncios">Mis anuncios</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
        <ModalWindow isOpen={isModalOpen} onClose={closeModal} onLoginSuccess={updateUserName} openRegisterModal={openRegisterModal} />
        <RegistroUsuarioModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </Navbar>
);
};