import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // useParams para obtener el ID de la URL

const VerDetalles = () => {
    const { id } = useParams(); // Obtener el ID de la habitación desde la URL
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabitacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/habitaciones/${id}`);
                setHabitacion(response.data); // Guardar los datos de la habitación
            } catch (err) {
                setError('Hubo un error al obtener los detalles de la habitación.');
            }
        };

        fetchHabitacion(); // Llamada a la función para obtener la habitación
    }, [id]); // El efecto se ejecuta cuando cambia el ID

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
                    <div className="col-md-4 mb-4">
                        <img
                            src={`http://localhost:8080/${habitacion.id}/${habitacion.imagenes[0]?.nombre}`} 
                            alt={habitacion.nombre} 
                            className="img-fluid"
                        />
                    </div>
            </div>
            <div className="text-center">
                <p>{habitacion.descripcion}</p>
                <p>Precio: {habitacion.precio}</p>

                {/* Botón para redirigir a la galería completa */}
                <Link to={`/galeria-completa/${habitacion.id}`} className="btn btn-primary">
                    Ver más
                </Link>
            </div>
        </div>
    );
};

export default VerDetalles;
