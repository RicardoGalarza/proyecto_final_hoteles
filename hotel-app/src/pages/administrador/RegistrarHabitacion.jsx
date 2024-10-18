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
    const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', mensaje: '' });

    useEffect(() => {
        // Hacer la solicitud GET para obtener las categorías cuando se carga la página
        axios.get('http://localhost:8080/categorias')
            .then(response => {
                // Transformar los datos para que funcionen con react-select
                const opcionesCategorias = response.data.map(categoria => ({
                    value: categoria.id,
                    label: categoria.nombre
                }));
                setCategorias(opcionesCategorias); // Guardar las categorías en el estado
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

        imagenes.forEach((imagen) => {
            formData.append('imagenes', imagen);
        });

        try {
            const response = await axios.post('http://localhost:8080/habitaciones', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setAlerta({ mostrar: true, tipo: 'success', mensaje: '¡Habitación registrada con éxito!' });
        } catch (error) {
            console.error('Error al registrar la habitación:', error);
            setAlerta({ mostrar: true, tipo: 'danger', mensaje: 'Hubo un error al registrar la habitación.' });
        }
    };

    const handleImagenesChange = (e) => {
        setImagenes([...e.target.files]);
    };

    const handleCategoriaChange = (selectedOptions) => {
        setCategoriaSeleccionada(selectedOptions); // Guardar las categorías seleccionadas
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
                    <label htmlFor="imagenes" className="form-label">Imágenes</label>
                    <input type="file" className="form-control" id="imagenes" multiple onChange={handleImagenesChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarHabitacion;
