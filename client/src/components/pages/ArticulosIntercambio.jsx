import React, { useState, useEffect } from 'react';
import { ArticuloCard } from '../layout/ArticuloCard';
import { Detalles } from './Detalles';

export const ArticulosIntercambio = ({categoria}) => {
    const [articulosVenta, setArticulosVenta] = useState([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

    const onVerDetalles = (idArticulo) => {
        const articuloEncontrado = articulosVenta.concat(articulosIntercambio).find(articulo => articulo.id_articulo === idArticulo);
        setArticuloSeleccionado(articuloEncontrado);
    };

    const categoriasTitulo = {
        '1': 'Juegos',
        '2': 'Consolas',
        '3': 'Accesorios'
    };

    const tituloCategoria = categoriasTitulo[categoria]

    useEffect(() => {
        const obtenerArticulosVenta = async () => {
            try {
                const url = `http://localhost:3000/api/articulos?tipo=Intercambio&categoria=${categoria}`;
                const response = await fetch(url);
                if (response.ok) {
                    const articulos = await response.json();
                    setArticulosVenta(articulos);
                } else {
                    console.error('Error al obtener artículos en venta');
                }
            } catch (error) {
                console.error('Error al obtener los artículos en venta:', error);
            }
        };
        obtenerArticulosVenta();
    }, [categoria]);
    
    return (
        <div className='inicio'>
            <h2>Últimos {tituloCategoria}</h2>
            
            <div className='lista-articulos'>
                {articulosVenta.map((articulo) => (
                    <ArticuloCard key={articulo.id_articulo} articulo={articulo} onVerDetalles={onVerDetalles} />
                ))}
            </div>

            {articuloSeleccionado && <Detalles articulo={articuloSeleccionado} />}
        </div>
    );
};
