import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditarHabitacion = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const navigate = useNavigate();
    const [habitacion, setHabitacion] = useState({ nombre: '', descripcion: '', estado: '' });
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' }); // Estado para la alerta

    useEffect(() => {
        // Cargar los datos de la habitación cuando se monta el componente
        axios.get(`http://localhost:8080/habitaciones/${id}`)
            .then(response => {
                setHabitacion(response.data);
            })
            .catch(error => {
                console.error('Error al cargar la habitación:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setHabitacion({
            ...habitacion,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/habitaciones/${id}`, habitacion)
            .then(() => {
                setAlerta({ visible: true, mensaje: 'Cambios guardados con éxito', tipo: 'success' });
                setTimeout(() => {
                    setAlerta({ visible: false });
                    navigate('/admin/verhabitacion'); 
                }, 2000);
            })
            .catch(error => {
                setAlerta({ visible: true, mensaje: 'Error al guardar los cambios', tipo: 'danger' });
                console.error('Error al actualizar la habitación:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Editar Habitación</h2>

            {/* Mostrar alerta solo si está visible */}
            {alerta.visible && (
                <Alert variant={alerta.tipo} onClose={() => setAlerta({ ...alerta, visible: false })} dismissible>
                    {alerta.mensaje}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={habitacion.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        name="descripcion"
                        value={habitacion.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={habitacion.precio}
                        onChange={handleChange}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarHabitacion;
