import axios from 'axios';
import React, { useState } from 'react';

const RegistrarHabitacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagenes, setImagenes] = useState([]);

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
            alert('Habitación registrada con éxito');
        } catch (error) {
            console.error('Error al registrar la habitación:', error);
            alert('Hubo un error al registrar la habitación');
        }
    };

    const handleImagenesChange = (e) => {
        setImagenes([...e.target.files]);
    };

    return (
        <div className="container mt-5">
            <h2>Registrar Habitación</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagenes" className="form-label">Imágenes</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imagenes"
                        onChange={handleImagenesChange}
                        multiple
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarHabitacion;
