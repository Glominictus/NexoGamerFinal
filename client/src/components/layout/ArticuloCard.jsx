import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const ArticuloCard = ({ articulo, onVerDetalles, mostrarOpciones, onEditar, onBorrar, onActualizarAnuncios }) => {
    const [open, setOpen] = useState(false);
    const [plataformas, setPlataformas] = useState([]);
    const navigate = useNavigate();

    const verDetalles = () => {
        navigate(`/articulos/${articulo.id_articulo}`);
    };

    const editarArticulo = () => {
        onEditar(articulo);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // En ArticuloCard.jsx
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/articulos/${articulo.id_articulo}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("Artículo eliminado con éxito.");
                onActualizarAnuncios();
            } else {
                console.error("Error al eliminar el artículo.");
            }
        } catch (error) {
            console.error("Error al eliminar el artículo: ", error);
        }

        handleClose();
        navigate('/MisAnuncios');
    };

    useEffect(() => {
        const cargarPlataformas = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/plataformas/');
                const data = await response.json();
                const mapaPlataformas = {};
                data.forEach(plataforma => {
                    mapaPlataformas[plataforma.id_plataforma] = plataforma.nombre;
                });
                setPlataformas(mapaPlataformas);
            } catch (error) {
                console.error("Error al cargar plataformas: ", error);
            }
        };

        cargarPlataformas();
    }, []);

    const nombrePlataforma = plataformas[articulo.id_plataforma] || 'Desconocida';

    return (

        <div className='articulo-card'>

            <div className='articulo-cabecera'>
                <h3>{articulo.nombre}</h3>
            </div>

            <div className='articulo-imagen'>
                <img src={articulo.imagenes} alt={articulo.nombre} />
            </div>

            <div className='articulo-contenido'>
                <p>Plataforma: {nombrePlataforma}</p>
                {console.log(articulo.plataforma)}
                {articulo.tipo === 'Venta' && <p>Precio: {articulo.precio}€</p>}
                {articulo.tipo === 'Intercambio' && <p>Interés: {articulo.interes}</p>}
            </div>

            <div className='articulo-boton'>
                <button onClick={verDetalles}>Ver Detalles</button>
                {mostrarOpciones && (
                    <>
                        <button className='boton-editar' onClick={editarArticulo}>Editar</button>
                        <button className='boton-borrar' onClick={handleClickOpen}>Borrar</button>
                    </>
                )}
            </div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Borrado"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de querer borrar este artículo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
