import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Header } from '../components/layout/Header';
import { BarNav } from '../components/layout/BarNav';
import { MisAnuncios } from '../components/pages/MisAnuncios';
import { FormularioAnuncio } from '../components/pages/FormularioAnuncio';
import { Inicio } from '../components/pages/Inicio';
import { Detalles } from '../components/pages/Detalles';
import { FormularioEdicion } from '../components/pages/FormularioEdicion';
import {ArticulosVenta} from "../components/pages/ArticulosVenta";
import { ArticulosIntercambio } from '../components/pages/ArticulosIntercambio';
import { Footer } from '../components/layout/footer';
export const Rutas = () => {
  return (
    <BrowserRouter>
      <BarNav />
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/MisAnuncios" element={<MisAnuncios />} />
        <Route path="/FormularioAnuncio" element={<FormularioAnuncio/>} />
        <Route path="/articulos/:id" element={<Detalles />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/edicion/:id" element={<FormularioEdicion />} />
        <Route path="/segunda-mano/juegos" element={<ArticulosVenta categoria="1" />} />
        <Route path="/segunda-mano/consolas" element={<ArticulosVenta categoria="2" />} />
        <Route path="/segunda-mano/accesorios" element={<ArticulosVenta categoria="3" />} />
        <Route path="/intercambio/juegos" element = {<ArticulosIntercambio categoria="1" />} />
        <Route path="/intercambio/consolas" element = {<ArticulosIntercambio categoria="2" />} />
        <Route path="/intercambio/accesorios" element = {<ArticulosIntercambio categoria="3" />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
