import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GaleriaCompleta = () => {
    const { id } = useParams();  // Captura el ID de la URL
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Lógica para obtener la habitación con todas sus imágenes
        const fetchHabitacion = async () => {
            try {
                const response = await fetch(`http://localhost:8080/habitaciones/${id}`);
                const data = await response.json();
                setHabitacion(data);
            } catch (err) {
                setError('Error al cargar la galería completa');
            }
        };

        fetchHabitacion();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!habitacion || habitacion.imagenes.length === 0) {
        return <div>No hay imágenes para mostrar</div>;
    }

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center">Galeria Completa</h2>
            <div className="row mb-3">
                {habitacion.imagenes.map((imagen, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <img
                            src={`http://localhost:8080/${habitacion.id}/${imagen.nombre}`}
                            alt={`Imagen ${index + 1}`}
                            className="img-fluid"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleriaCompleta;
