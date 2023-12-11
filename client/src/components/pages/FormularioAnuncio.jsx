import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import imagenCorp from '../../assets/images/imagenCorp.png'
export const FormularioAnuncio = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [plataforma, setPlataforma] = useState([]);
    const [genero, setGenero] = useState([]);
    const [tipoAnuncio, setTipoAnuncio] = useState("");
    const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null);
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categorias/');
                const data = await response.json();
                console.log(data);
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarCategorias();
    }, []);

    useEffect(() => {
        const cargarPlataforma = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/plataformas/');
                const data = await response.json();
                console.log(data);
                setPlataforma(data);
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarPlataforma();
    }, []);
    useEffect(() => {
        const cargarGenero = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generos/');
                const data = await response.json();
                console.log(data);
                setGenero(data);
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarGenero();
    }, []);


    const tiposAnuncio = ["venta", "intercambio"];
    const handleCategoriaChange = (e) => {
        const nombreSeleccionado = e.target.value;
        const categoriaCorrespondiente = categorias.find(categoria => categoria.nombre === nombreSeleccionado);
        if (categoriaCorrespondiente) {
            setCategoriaSeleccionada(categoriaCorrespondiente.id_categoria);
            console.log('ID de la categoría seleccionada:', categoriaCorrespondiente.id_categoria);
        } else {
            console.error('No se encontró una categoría con ese nombre');
        }
    };
    const handlePlataformaChange = (e) => {

        const nombreSeleccionado = e.target.value
        const plataformaCorrespondiente = plataforma.find(plataforma => plataforma.nombre === nombreSeleccionado);
        if (plataformaCorrespondiente) {
            setPlataformaSeleccionada(plataformaCorrespondiente.id_plataforma)
            console.log('ID de la plataforma seleccionada:', plataformaCorrespondiente.id_plataforma)
        } else {
            console.error('No se encontró una plataforma con ese nombre');
        }
    };
    const handleGeneroChange = (e) => {
        const nombreSeleccionado = e.target.value
        const generoCorrespondiente = genero.find(genero => genero.nombre === nombreSeleccionado);
        if (generoCorrespondiente) {
            setGeneroSeleccionado(generoCorrespondiente.id_genero)
            console.log('ID del genero seleccionado:', generoCorrespondiente.id_genero)
        } else {
            console.error('No se encontró un genero con ese nombre');
        }
    }
    const validarFormulario = () => {
        let erroresTemp = {};
        if (!tipoAnuncio) erroresTemp.tipoAnuncio = 'Elige un tipo de anuncio';
        if (!categoriaSeleccionada) erroresTemp.categoria = 'Selecciona una categoría';
        if (!plataformaSeleccionada) erroresTemp.plataforma = 'Selecciona una plataforma';
        if (categoriaSeleccionada === 1 && !generoSeleccionado) erroresTemp.genero = 'Selecciona un género';
        if (!document.querySelector('input[name="nombre"]').value) erroresTemp.nombre = 'Ingresa un nombre';
        if (!document.querySelector('textarea[name="descripcion"]').value) erroresTemp.descripcion = 'Ingresa una descripción';
        if (tipoAnuncio === "venta") {
            const precio = document.querySelector('input[name="precio"]').value;
            if (!precio) {
                erroresTemp.precio = 'Ingresa un precio';
            } else if (isNaN(precio) || precio < 0) {
                erroresTemp.precio = 'El precio debe ser un número válido y no inferior a 0';
            }
        }
    
        if (tipoAnuncio === "intercambio" && !document.querySelector('textarea[name="interes"]').value) {
            erroresTemp.interes = 'Describe lo que te interesa';
        }
        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            console.error('Formulario inválido');
            return;
        }

        const nombre = document.querySelector('input[name="nombre"]').value;
        const descripcion = document.querySelector('textarea[name="descripcion"]').value;
        const precio = tipoAnuncio === 'venta' ? document.querySelector('input[name="precio"]').value : 0
        const interes = tipoAnuncio === 'intercambio' ? document.querySelector('textarea[name="interes"]').value : null;
        const imagen = document.querySelector('input[name="imagen"]').files[0];
        const idUsuario = localStorage.getItem('id_usuario');
        const fechaActual = new Date().toISOString();
        

        let imageUrl = imagenCorp;
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
        const idCategoria = parseInt(categoriaSeleccionada);
        const idPlataforma = parseInt(plataformaSeleccionada);
        const idGenero = generoSeleccionado ? parseInt(generoSeleccionado) : undefined;


        if (isNaN(idCategoria) || isNaN(idPlataforma) || (generoSeleccionado && isNaN(idGenero))) {
            console.error('ID de categoría o plataforma no válido o género no valido');
            return;
        }


        const articuloData = {
            nombre,
            descripcion,
            precio,
            interes,
            id_categoria: idCategoria,
            id_plataforma: idPlataforma,
            tipo: tipoAnuncio,
            imagenes: imageUrl,
            id_usuario: parseInt(idUsuario),
            fecha_publicacion: fechaActual
        };
        if (idGenero) {
            articuloData.id_genero = idGenero;
        }
        console.log('Datos que se enviarán:', articuloData);



        const response = await fetch('http://localhost:3000/api/articulos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloData)
        });


        if (response.ok) {
            const responseData = await response.json();
            console.log('Artículo creado con éxito:', responseData);
            navigate('/MisAnuncios');

        } else {
            console.error('Error al crear el artículo:', await response.text());

        }
    };


    return (
        <div>
            <h1 className='new-anuncio-tittle'>Nuevo Anuncio</h1>
            <div className='form-container'>
                <form>
                    <div className='radio-group'>
                        <label htmlFor="tipoAnuncio">Tipo de anuncio:</label>
                        <br />
                        {tiposAnuncio.map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="radio"
                                    value={tipo}
                                    name="tipoAnuncio"
                                    onChange={(e) => setTipoAnuncio(e.target.value)}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoría:</label>
                        <select name="categoria" onChange={handleCategoriaChange}>
                            <option value="" disabled selected>Elige la categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plataforma">Plataforma:</label>
                        <select name="plataforma" onChange={handlePlataformaChange}>
                            <option value="" disabled selected>Elige la plataforma</option>
                            {plataforma.map((plataforma) => (
                                <option key={plataforma.id} value={plataforma.id}>
                                    {plataforma.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        {categoriaSeleccionada === 1 && (
                            <>
                                <label htmlFor="genero">Género:</label>
                                <select name="genero" id="genero" onChange={handleGeneroChange} >
                                    <option value="" disabled selected>Elige el género</option>
                                    {genero.map((genero) => (
                                        <option key={genero.id} value={genero.id}>
                                            {genero.nombre}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input type='text' name='nombre' /* onChange={...} */ />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion:</label>
                        <textarea name="descripcion" /* onChange={...} */></textarea>
                    </div>
                    <div className="form-group precio">
                        {tipoAnuncio === "venta" && (
                            <>
                                <label htmlFor="precio">Precio:</label>
                                <div className="input-group">
                                    <input className="form-control precio-input" type="text" name="precio" id="precio" /* onChange={...} */ />
                                    <span className="input-group-addon moneda">€</span>
                                </div>
                            </>
                        )}
                        {tipoAnuncio === "intercambio" && (
                            <>
                                <label htmlFor="interes">Me interesa:</label>
                                <textarea className='interes-area' name="interes" /* onChange={...} */></textarea>
                            </>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor='imagen'>Imagenes:</label>
                        <input type="file" name="imagen" /* onChange={...} */ multiple />
                    </div>
                    <div className='form-group'>
                        <button type="submit" onClick={handleSubmit}>Enviar Anuncio</button>
                        {Object.values(errores).map((error, index) => (
                            <div key={index} className="error-message">{error}</div>
                        ))}
                    </div>

                </form>
            </div>
        </div>
    )
}
