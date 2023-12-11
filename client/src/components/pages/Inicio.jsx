import React, { useState, useEffect } from 'react';
import { ArticuloCard } from '../layout/ArticuloCard';
import { Detalles } from './Detalles';

export const Inicio = () => {
    const [articulosVenta, setArticulosVenta] = useState([]);
    const [articulosIntercambio, setArticulosIntercambio] = useState([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

    useEffect(() => {
        const obtenerArticulosVenta = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/articulos?tipo=Venta&limit=3');
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

        const obtenerArticulosIntercambio = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/articulos?tipo=Intercambio&limit=3');
                if (response.ok) {
                    const articulos = await response.json();
                    setArticulosIntercambio(articulos);
                } else {
                    console.error('Error al obtener artículos para intercambio');
                }
            } catch (error) {
                console.error('Error al obtener los artículos para intercambio:', error);
            }
        };

        obtenerArticulosVenta();
        obtenerArticulosIntercambio();
    }, []);

    const onVerDetalles = (idArticulo) => {
        const articuloEncontrado = articulosVenta.concat(articulosIntercambio).find(articulo => articulo.id_articulo === idArticulo);
        setArticuloSeleccionado(articuloEncontrado);
    };

    return (
        <div className='inicio'>
            <h2>Últimos Artículos en Venta</h2>
            <div className='lista-articulos'>
                {articulosVenta.map((articulo) => (
                    <ArticuloCard key={articulo.id_articulo} articulo={articulo} onVerDetalles={onVerDetalles} />
                ))}
            </div>

            <h2>Últimos Artículos para Intercambio</h2>
            <div className='lista-articulos'>
                {articulosIntercambio.map((articulo) => (
                    <ArticuloCard key={articulo.id_articulo} articulo={articulo} onVerDetalles={onVerDetalles} />
                ))}
            </div>

            {articuloSeleccionado && <Detalles articulo={articuloSeleccionado} />}
        </div>
    );
};
