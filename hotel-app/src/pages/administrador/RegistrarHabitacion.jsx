import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Importar react-select

const RegistrarHabitacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]); // Inicializar como array
    const [ciudades, setCiudades] = useState([]);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null); // Guardar la ciudad seleccionada
    const [huespedesAdultos, setHuespedesAdultos] = useState(1); // Inicializar con un valor predeterminado
    const [huespedesNinos, setHuespedesNinos] = useState(0); // Inicializar con un valor predeterminado
    const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', mensaje: '' });

    useEffect(() => {
        // Hacer la solicitud GET para obtener las categorías y las ciudades cuando se carga la página
        axios.get('http://localhost:8080/categorias')
            .then(response => {
                const opcionesCategorias = response.data.map(categoria => ({
                    value: categoria.id,
                    label: categoria.nombre
                }));
                setCategorias(opcionesCategorias);
            })
            .catch(error => {
                setAlerta({ mostrar: true, tipo: 'danger', mensaje: error });
            });

        // Obtener la lista de ciudades
        axios.get('http://localhost:8080/ciudades')
            .then(response => {
                const opcionesCiudades = response.data.map(ciudad => ({
                    value: ciudad.id,
                    label: ciudad.nombre
                }));
                setCiudades(opcionesCiudades);
            })
            .catch(error => {
                setAlerta({ mostrar: true, tipo: 'danger', mensaje: error });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', parseFloat(precio));

        // Enviar categorías seleccionadas como array de IDs
        const categoriasSeleccionadasIds = categoriaSeleccionada.map(option => option.value);
        formData.append('categorias', JSON.stringify(categoriasSeleccionadasIds));

        // Enviar ciudad seleccionada
        if (ciudadSeleccionada) {
            formData.append('ciudad', ciudadSeleccionada.value);
        }

        // Enviar imágenes seleccionadas
        imagenes.forEach((imagen) => {
            formData.append('imagenes', imagen);
        });

        // Enviar cantidad de huéspedes
        formData.append('huespedesAdultos', huespedesAdultos);
        formData.append('huespedesNinos', huespedesNinos);

        try {
            const response = await axios.post('http://localhost:8080/habitaciones', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setAlerta({ mostrar: true, tipo: 'success', mensaje: '¡Habitación registrada con éxito!' });

            // Ocultar la alerta después de 5 segundos y refrescar la página
            setTimeout(() => {
                setAlerta({ mostrar: false, tipo: '', mensaje: '' });
                window.location.reload(); // Refrescar la página
            }, 5000);

        } catch (error) {
            console.error('Error al registrar la habitación:', error);
            setAlerta({ mostrar: true, tipo: 'danger', mensaje: 'Hubo un error al registrar la habitación.' });

            // Ocultar la alerta después de 5 segundos
            setTimeout(() => {
                setAlerta({ mostrar: false, tipo: '', mensaje: '' });
            }, 3000);
        }
    };

    const handleImagenesChange = (e) => {
        setImagenes([...e.target.files]);
    };

    const handleCategoriaChange = (selectedOptions) => {
        setCategoriaSeleccionada(selectedOptions); // Guardar las categorías seleccionadas
    };

    const handleCiudadChange = (selectedOption) => {
        setCiudadSeleccionada(selectedOption); // Guardar la ciudad seleccionada
    };

    return (
        <div>
            <h2>Registrar Habitacion</h2>
            {alerta.mostrar && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlerta({ mostrar: false, tipo: '', mensaje: '' })}></button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <Select
                        isMulti
                        options={categorias}
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                        placeholder="Selecciona una o más categorías"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <Select
                        options={ciudades}
                        value={ciudadSeleccionada}
                        onChange={handleCiudadChange}
                        placeholder="Selecciona una ciudad"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="huespedesAdultos" className="form-label">Huéspedes Adultos</label>
                    <input
                        type="number"
                        className="form-control"
                        id="huespedesAdultos"
                        value={huespedesAdultos}
                        onChange={(e) => setHuespedesAdultos(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="huespedesNinos" className="form-label">Huéspedes Niños</label>
                    <input
                        type="number"
                        className="form-control"
                        id="huespedesNinos"
                        value={huespedesNinos}
                        onChange={(e) => setHuespedesNinos(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imagenes" className="form-label">Imágenes</label>
                    <input type="file" className="form-control" id="imagenes" multiple onChange={handleImagenesChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarHabitacion;
