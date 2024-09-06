import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GaleriaCompleta = () => {
    const { id } = useParams();  // Captura el ID de la URL
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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

    const handleVolver = () => {
        navigate(`/habitaciones/${id}`); // Redirige a Ver Detalles
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center ">Galeria Completa</h2>
            <div className="row mb-3">
                {habitacion.imagenes.map((imagen, index) => (
                    <div className="col-md-4 mb-4 zoom" key={index}>
                        <img
                            src={`http://localhost:8080/${habitacion.id}/${imagen.nombre}`}
                            alt={`Imagen ${index + 1}`}
                            className="img-fluid"
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>

            {/* Botón Volver Atrás */}
            <div className="text-end mb-5">
                <button onClick={handleVolver} className="btn btn-primary">
                    Volver Atrás
                </button>
            </div>
        </div>
    );
};

export default GaleriaCompleta;
