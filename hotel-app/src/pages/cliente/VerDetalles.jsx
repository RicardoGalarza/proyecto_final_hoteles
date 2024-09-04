import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importamos useNavigate para la redirección

const VerDetalles = () => {
    const { id } = useParams(); // Obtiene el id de la habitación de la URL
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const fetchHabitacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/habitaciones/${id}`);
                setHabitacion(response.data);
            } catch (err) {
                console.error('Hubo un error al obtener los detalles de la habitación', err);
                setError('Hubo un problema al cargar los detalles. Por favor, intenta más tarde.');
            }
        };

        fetchHabitacion();
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!habitacion) {
        return <div>Cargando detalles...</div>;
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">{habitacion.nombre}</h2>
            <div className="row">
                {habitacion.imagenes.map((imagen) => (
                    <div className="col-md-4 mb-4" key={imagen.id}>
                        <img
                            src={`http://localhost:8080/${habitacion.id}/${imagen.nombre}`}
                            alt={habitacion.nombre}
                            className="img-fluid"
                        />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <p>{habitacion.descripcion}</p>
                <p>Precio: {habitacion.precio}</p>
                {/* Botón Ver más que redirige a la galería completa */}
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/galeria-completa/${habitacion.id}`)}
                >
                    Ver más
                </button>
            </div>
        </div>
    );
};

export default VerDetalles;
