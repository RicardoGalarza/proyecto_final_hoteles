import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const HabitacionesDisponibles = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
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

        // Llamada a la API para obtener las categorías
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:8080/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.log('Error al cargar categorías:', error);
            }
        };

        fetchHabitaciones();
        fetchCategorias();
    }, []);

    const indexOfLastHabitacion = currentPage * habitacionesPorPagina;
    const indexOfFirstHabitacion = indexOfLastHabitacion - habitacionesPorPagina;

    // Filtrar habitaciones por categoría seleccionada
    const habitacionesFiltradas = categoriaSeleccionada
        ? habitaciones.filter(habitacion =>
            habitacion.categorias.some(categoria => categoria.id === parseInt(categoriaSeleccionada))
        )
        : habitaciones;

    const habitacionesActuales = habitacionesFiltradas.slice(indexOfFirstHabitacion, indexOfLastHabitacion);

    const paginacion = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };

    // Obtener el número de páginas
    const totalPaginas = Math.ceil(habitacionesFiltradas.length / habitacionesPorPagina);

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
        setCurrentPage(1); // Reiniciar la página actual al cambiar la categoría
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Habitaciones Disponibles</h2>

            {/* Selector de categorías con Bootstrap */}
            <div className="mb-4">
                <div className="input-group" style={{ width: '50%', margin: '0 auto' }}>
                    <select
                        id="categoria-select"
                        className="form-select form-select-lg border-dark"
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                        aria-label="Filtrar por categoría"
                    >
                        <option value="">Selecciona las Categorías</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-dark" type="button" onClick={() => setCategoriaSeleccionada('')}>
                        Limpiar Filtro
                    </button>
                </div>
            </div>

            {habitacionesFiltradas.length > 0 ? (
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
