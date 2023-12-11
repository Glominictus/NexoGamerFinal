import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
export const FormularioEdicion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [interes, setInteres] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null);
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
    const [tipoAnuncio, setTipoAnuncio] = useState('');
    const [actualizarImagen, setActualizarImagen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const { id } = useParams();
    const idArticulo = parseInt(id);
    const tiposAnuncio = ["venta", "intercambio"];
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                const resCategorias = await fetch('http://localhost:3000/api/categorias/');
                const dataCategorias = await resCategorias.json();
                setCategorias(dataCategorias);

                const resPlataformas = await fetch('http://localhost:3000/api/plataformas/');
                const dataPlataformas = await resPlataformas.json();
                setPlataformas(dataPlataformas);

                const resGeneros = await fetch('http://localhost:3000/api/generos/');
                const dataGeneros = await resGeneros.json();
                setGeneros(dataGeneros);
                console.log(dataCategorias, dataPlataformas, dataGeneros);
            } catch (error) {
                console.error("Error al cargar datos iniciales: ", error);
            }
        };
        cargarDatosIniciales();
    }, []);

    useEffect(() => {
        const cargarDatosAnuncio = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/articulos/${idArticulo}`);
                const data = await response.json();
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setPrecio(data.precio.toString());
                setInteres(data.interes);
                setCategoriaSeleccionada(data.id_categoria);
                setPlataformaSeleccionada(data.id_plataforma);
                setGeneroSeleccionado(data.id_genero);
                if (tiposAnuncio.includes(data.tipo.toLowerCase())) {
                    setTipoAnuncio(data.tipo.toLowerCase());
                }

            } catch (error) {
                console.error("Error al cargar datos del anuncio: ", error);
            }
        };

        cargarDatosAnuncio();

    }, [idArticulo]);
    const handleImagenChange = (e) => {
        if (e.target.files.length > 0) {
            setActualizarImagen(true);
        } else {
            setActualizarImagen(false);
        }
    };
    const handleCategoriaChange = (e) => {
        const idSeleccionado = parseInt(e.target.value, 10);
        if (!isNaN(idSeleccionado)) {
            setCategoriaSeleccionada(idSeleccionado);
        } else {
            console.error("Valor seleccionado para categoría no es un número:", e.target.value);
        }
    };
    const handlePlataformaChange = (e) => {
        const idSeleccionado = parseInt(e.target.value, 10);
        if (!isNaN(idSeleccionado)) {
            setPlataformaSeleccionada(idSeleccionado);
        } else {
            console.error("Valor seleccionado para plataforma no es un número:", e.target.value);
        }
    };
    const handleGeneroChange = (e) => {
        const idSeleccionado = parseInt(e.target.value, 10);
        if (!isNaN(idSeleccionado)) {
            setGeneroSeleccionado(idSeleccionado);
        } else {
            console.error("Valor seleccionado para genero no es un número:", e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = '';
        console.log('Categoria seleccionada:', categoriaSeleccionada);
        console.log('Plataforma seleccionada:', plataformaSeleccionada);
        console.log('Genero seleccionado:', generoSeleccionado);
        if (actualizarImagen) {
            const imagen = document.querySelector('input[name="imagen"]').files[0];
            if (imagen) {
                const imageForm = new FormData();
                imageForm.append('image', imagen);
                const imageResponse = await fetch('https://api.imgbb.com/1/upload?key=949b24ffb477062f170dac82ba1186ca', {
                    method: 'POST',
                    body: imageForm
                });
                const imageData = await imageResponse.json();
                imageUrl = imageData.data.url;
            }
        }
        const idCategoria = parseInt(categoriaSeleccionada);
        const idPlataforma = parseInt(plataformaSeleccionada);
        const idGenero = generoSeleccionado ? parseInt(generoSeleccionado) : undefined;

        if (isNaN(idCategoria) || isNaN(idPlataforma) || (generoSeleccionado && isNaN(idGenero))) {
            console.log(idCategoria, idPlataforma, generoSeleccionado, idGenero);
            console.error('ID de categoría o plataforma no válido o género no valido');
            return;
        }
        if (actualizarImagen) {
            const imagen = document.querySelector('input[name="imagen"]').files[0];
            if (actualizarImagen) {
                const imagen = document.querySelector('input[name="imagen"]').files[0];
                if (imagen) {
                    const imageForm = new FormData();
                    imageForm.append('image', imagen);

                    try {
                        const imageResponse = await fetch('https://api.imgbb.com/1/upload?key=TU_CLAVE_API', {
                            method: 'POST',
                            body: imageForm
                        });

                        if (imageResponse.ok) {
                            const imageData = await imageResponse.json();
                            imageUrl = imageData.data.url;
                        } else {
                            console.error('Error al subir la imagen:', await imageResponse.text());
                        }
                    } catch (error) {
                        console.error('Error al subir la imagen:', error);
                    }
                }
            setActualizarImagen(false);
        }
    }
    const articuloData = {
        nombre,
        descripcion,
        precio: tipoAnuncio === 'venta' ? precio : 0,
        interes: tipoAnuncio === 'intercambio' ? interes : null,
        id_categoria: idCategoria,
        id_plataforma: idPlataforma,
        tipo: tipoAnuncio,
        imagenes: imageUrl || undefined,
        id_usuario: parseInt(localStorage.getItem('id_usuario')),
        fecha_publicacion: new Date().toISOString()
    };
    if (idGenero) {
        articuloData.id_genero = idGenero;
    }
    console.log('Datos que se enviarán:', articuloData);
    const response = await fetch(`http://localhost:3000/api/articulos/${idArticulo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articuloData)
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log('Artículo actualizado con éxito:', responseData);
        navigate('/MisAnuncios');
    } else {
        console.error('Error al actualizar el artículo:', await response.text());
    }
};


return (
    <div>
        <h1 className='new-anuncio-tittle'>Editar Anuncio</h1>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>


                <div className='radio-group'>
                    <label htmlFor="tipoAnuncio">Tipo de anuncio:</label>
                    <br />
                    {tiposAnuncio.map((tipo) => (
                        <label key={tipo}>
                            <input
                                type="radio"
                                value={tipo}
                                name="tipoAnuncio"
                                checked={tipoAnuncio === tipo}
                                onChange={(e) => setTipoAnuncio(e.target.value)}
                            />
                            {tipo}
                        </label>
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        name="categoria"
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                    >
                        <option value="" disabled>Elige la categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="plataforma">Plataforma:</label>
                    <select
                        name="plataforma"
                        value={plataformaSeleccionada}
                        onChange={handlePlataformaChange}
                    >
                        <option value="" disabled>Elige la plataforma</option>
                        {plataformas.map((plataforma) => (
                            <option key={plataforma.id_plataforma} value={plataforma.id_plataforma}>
                                {plataforma.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {categoriaSeleccionada === 1 && (
                    <div className="form-group">
                        <label htmlFor="genero">Genero:</label>
                        <select
                            name="genero"
                            value={generoSeleccionado}
                            onChange={handleGeneroChange}
                        >
                            <option value="" disabled>Elige el genero</option>
                            {generos.map((genero) => (
                                <option key={genero.id_genero} value={genero.id_genero}>
                                    {genero.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className='form-group'>
                    <label htmlFor='nombre'>Nombre:</label>
                    <input
                        type='text'
                        name='nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>


                <div className="form-group precio">
                    {tipoAnuncio === "venta" && (
                        <>
                            <label htmlFor="precio">Precio:</label>
                            <input
                                type="number"
                                name="precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </>
                    )}
                    {tipoAnuncio === "intercambio" && (
                        <>
                            <label htmlFor="interes">Me interesa:</label>
                            <textarea
                                name="interes"
                                value={interes}
                                onChange={(e) => setInteres(e.target.value)}
                            />
                        </>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor='imagen'>Imagenes:</label>
                    <input type="file" name="imagen" onChange={handleImagenChange} multiple />
                </div>

                <div className='form-group'>
                    <button type="submit">Actualizar Anuncio</button>
                </div>
            </form>
        </div>
    </div>
);
};