import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HabitacionesDisponibles = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8080/habitaciones');
                setHabitaciones(response.data.sort(() => Math.random() - 0.5));
                console.log(response.data);
                
            } catch (err) {
                console.error('Hubo un error al obtener las habitaciones', err);
                setError('Hubo un problema al cargar las habitaciones. Por favor, intenta más tarde.');
            }
        };

        fetchHabitaciones();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Habitaciones Disponibles</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="row">
                {habitaciones.length > 0 ? (
                    habitaciones.slice(0, 10).map((habitacion) =>  (
                        <div className="col-md-6 mb-4" key={habitacion.id}>
                            <div className="card h-100">
                                {/* Ajusta la imagen para que se vea bien y esté centrada */}
                                <img
                                    src={`http://localhost:8080/${habitacion.id}/${habitacion.imagenes[0].nombre}`}
                                    alt={habitacion.nombre}
                                    className="card-img-top mx-auto"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Ajusta el tamaño de la imagen
                                />
                                <div className="card-body text-center"> {/* Centra el contenido */}
                                    <h5 className="card-title">{habitacion.nombre}</h5>
                                    <p className="card-text">{habitacion.descripcion}</p>
                                    <p className="card-text"><strong>{habitacion.precio}</strong></p>
                                    <a href={`/habitaciones/${habitacion.id}`} className="btn btn-primary">
                                        Ver Detalles
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No hay habitaciones disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HabitacionesDisponibles;
