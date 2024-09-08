import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const HabitacionesDisponibles = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const habitacionesPorPagina = 10;

    useEffect(() => {
        // Llamada a la API para obtener las habitaciones
        const fetchHabitaciones = async () => {
            try {
                const response = await fetch('http://localhost:8080/habitaciones');
                const data = await response.json();
                setHabitaciones(data);
            } catch (error) {
                console.log('Error al cargar habitaciones:', error);
            }
        };
        fetchHabitaciones();
    }, []);

    const indexOfLastHabitacion = currentPage * habitacionesPorPagina;
    const indexOfFirstHabitacion = indexOfLastHabitacion - habitacionesPorPagina;
    const habitacionesActuales = habitaciones.slice(indexOfFirstHabitacion, indexOfLastHabitacion);

    const paginacion = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };

    // Obtener el número de páginas
    const totalPaginas = Math.ceil(habitaciones.length / habitacionesPorPagina);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Habitaciones Disponibles</h2>
            {habitaciones.length > 0 ? (
                <div className="row">
                    {habitacionesActuales.map((habitacion) => (
                        <div className="col-md-6 mb-4" key={habitacion.id}>
                            <div className="card h-100">
                                <img
                                    src={`http://localhost:8080/${habitacion.id}/${habitacion.imagenes[0].nombre}`}
                                    alt={habitacion.nombre}
                                    className="card-img-top mx-auto"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{habitacion.nombre}</h5>
                                    <p className="card-text">{habitacion.descripcion}</p>
                                    <p className="card-text"><strong>Precio:</strong> {habitacion.precio}</p>
                                    <a href={`/habitaciones/${habitacion.id}`} className="btn btn-primary">
                                        Ver Detalles
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No se encontraron habitaciones disponibles.
                </div>
            )}

            {/* Paginación */}
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => paginacion(1)} disabled={currentPage === 1} />              
                {[...Array(totalPaginas)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginacion(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}  
                <Pagination.Last onClick={() => paginacion(totalPaginas)} disabled={currentPage === totalPaginas} />
            </Pagination>
        </div>
    );
};

export default HabitacionesDisponibles;
