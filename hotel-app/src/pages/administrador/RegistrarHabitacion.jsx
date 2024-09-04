import axios from 'axios';
import React, { useState } from 'react';

const RegistrarHabitacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', mensaje: '' });



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', parseFloat(precio));
        console.log(typeof precio);

        imagenes.forEach((imagen) => {
            formData.append(`imagenes`, imagen);
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

            // Verifica si es un error de respuesta del servidor
            if (error.response) {
                // Si el status es 400, significa que hubo un problema con los datos (nombre duplicado)
                if (error.response.status === 400) {
                    setAlerta({ mostrar: true, tipo: 'danger', mensaje: error.response.data });
                } else {
                    setAlerta({ mostrar: true, tipo: 'danger', mensaje: 'Hubo un error en el registro de la habitación.' });
                }
            } else {
                // Si no es un error de respuesta (puede ser un problema de conexión, por ejemplo)
                setAlerta({ mostrar: true, tipo: 'danger', mensaje: 'Error en la conexión con el servidor.' });
            }
        }
    };

    const handleImagenesChange = (e) => {
        setImagenes([...e.target.files]);
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
                    <label htmlFor="imagenes" className="form-label">Imágenes</label>
                    <input type="file" className="form-control" id="imagenes" multiple onChange={handleImagenesChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarHabitacion;
