import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Detalles = () => {

    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);
    const [plataformas, setPlataformas] = useState({});
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const volverAInicio = () => {
        navigate('/');
    };

    useEffect(() => {
        const cargarDetalles = async () => {
            try {
                const responseArticulo = await fetch(`http://localhost:3000/api/articulos/${id}`);
                if (responseArticulo.ok) {
                    const dataArticulo = await responseArticulo.json();
                    setArticulo(dataArticulo);

                    const responseUsuario = await fetch(`http://localhost:3000/api/usuarios/${dataArticulo.id_usuario}`);
                    if (responseUsuario.ok) {
                        const dataUsuario = await responseUsuario.json();
                        setUsuario(dataUsuario);
                    } else {
                        console.error('Error al obtener los detalles del usuario');
                    }
                } else {
                    console.error('Error al obtener el artículo');
                }

                const responsePlataformas = await fetch('http://localhost:3000/api/plataformas/');
                if (responsePlataformas.ok) {
                    const plataformasData = await responsePlataformas.json();
                    const mapaPlataformas = {};
                    plataformasData.forEach(plataforma => {
                        mapaPlataformas[plataforma.id_plataforma] = plataforma.nombre;
                    });
                    setPlataformas(mapaPlataformas);
                } else {
                    console.error('Error al cargar plataformas');
                }
            } catch (error) {
                console.error('Error al obtener detalles:', error);
            }
        };

        cargarDetalles();
    }, [id]);

    if (!articulo || !usuario || !plataformas) {
        return <div>Cargando detalles...</div>;
    }

    const nombrePlataforma = plataformas[articulo.id_plataforma] || 'Desconocida';
    const nicknameUsuario = usuario.nickname || 'Desconocido';

    return (
        <div className='detalle-container'>
            
            <div className='detalle-articulo'>
                <h2>{articulo.nombre}</h2>
                <img  className='detalle-img'src={articulo.imagenes} alt={articulo.nombre} />
                <p><strong>Descripción:</strong> {articulo.descripcion}</p>

                {articulo.tipo === 'Venta' && <p><strong>Precio:</strong> {articulo.precio}€</p>}
                {articulo.tipo === 'Intercambio' && <p><strong>Interés:</strong> {articulo.interes}</p>}

                {articulo.id_categoria === 1 && (
                    <>
                        <p><strong>Plataforma:</strong> {nombrePlataforma}</p>
                        <p><strong>Género:</strong> {articulo.genero}</p>
                    </>
                )}

                {(articulo.id_categoria === 2 || articulo.id_categoria === 3) && (
                    <p><strong>Plataforma:</strong> {nombrePlataforma}</p>
                )}

                <p className='publicado-por'>Publicado por {nicknameUsuario} el {new Date(articulo.fecha_publicacion).toLocaleDateString()}</p>
            </div>
            <button onClick={volverAInicio}>Volver a Inicio</button>
        </div>
    );
};
