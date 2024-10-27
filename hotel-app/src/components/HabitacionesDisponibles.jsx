import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HabitacionesDisponibles = ({ habitacionesFiltradas }) => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [habitacionesMostradas, setHabitacionesMostradas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [opinionesPorHabitacion, setOpinionesPorHabitacion] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const habitacionesPorPagina = 10;
    const [favoritos, setFavoritos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("habitacionesFiltradas: ", habitacionesFiltradas);

        const fetchHabitaciones = async () => {
            try {
                const response = await fetch('http://localhost:8080/habitaciones');
                const data = await response.json();
                setHabitaciones(data);
            } catch (error) {
                console.log('Error al cargar habitaciones:', error);
            }
        };


        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:8080/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.log('Error al cargar categorías:', error);
            }
        };

        const fetchFavoritos = async () => {
            try {
                const cuentaId = JSON.parse(localStorage.getItem('userId'));
                const response = await axios.get(`http://localhost:8080/favoritos/cuenta/${cuentaId}`);
                setFavoritos(response.data);
            } catch (error) {
                console.log('Error al cargar favoritos:', error);
            }
        };

        const habitacionesFiltradasPorCategoria = categoriaSeleccionada
            ? habitacionesFiltradas.filter(hab => hab.categoria === categoriaSeleccionada)
            : habitacionesFiltradas;

        setHabitacionesMostradas(habitacionesFiltradasPorCategoria);

        fetchHabitaciones();
        fetchCategorias();
        fetchFavoritos(); // Cargar favoritos al iniciar
    }, [categoriaSeleccionada, habitacionesFiltradas]);

    useEffect(() => {
        if (habitaciones.length > 0) {
            const fetchOpiniones = async () => {
                try {
                    const opinionesMap = {};
                    for (const habitacion of habitaciones) {
                        const response = await fetch(`http://localhost:8080/opiniones/habitacion/${habitacion.id}`);
                        const data = await response.json();
                        if (Array.isArray(data)) {
                            const totalEstrellas = data.reduce((acc, opinion) => acc + opinion.estrellas, 0);
                            const cantidadOpiniones = data.length;
                            const promedioEstrellas = cantidadOpiniones > 0 ? (totalEstrellas / cantidadOpiniones).toFixed(1) : 0;
                            opinionesMap[habitacion.id] = { promedioEstrellas, cantidadOpiniones };
                        } else {
                            console.error('El formato de las opiniones no es un array:', data);
                        }
                    }
                    setOpinionesPorHabitacion(opinionesMap);
                } catch (error) {
                    console.log('Error al cargar opiniones:', error);
                }
            };
            fetchOpiniones();
        }
    }, [habitaciones]);

    const formatearMiles = (numero) => {
        return numero.toLocaleString('es-ES');
    };

    const fetchHabitacionesCategoria = async (categoria) => {
        try {
            const response = await fetch(`http://localhost:8080/habitaciones/categoria/${categoria}`);
            const data = await response.json();
            setHabitacionesMostradas(data);
        } catch (error) {
            console.log('Error al cargar las habitaciones:', error);
        }
    };

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
        setCurrentPage(1);

        fetchHabitacionesCategoria(e.target.value);
    };

    const indexOfLastHabitacion = currentPage * habitacionesPorPagina;
    const indexOfFirstHabitacion = indexOfLastHabitacion - habitacionesPorPagina;

    // const algo  = categoriaSeleccionada
    //     ? habitacionesFiltradas.filter(hab => hab.categoria === categoriaSeleccionada)
    //     : habitacionesFiltradas;

    // setHabitacionesMostradas(algo)

    const habitacionesActuales = habitacionesFiltradas.slice(indexOfFirstHabitacion, indexOfLastHabitacion);

    const paginacion = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };

    const totalPaginas = Math.ceil(habitacionesFiltradas.length / habitacionesPorPagina);



    // Función para manejar el toggle de favoritos
    const toggleFavorito = async (habitacionId) => {
        const cuentaId = parseInt(localStorage.getItem('userId'), 10);
        const esFavorito = favoritos.some(fav => fav.habitacion.id === habitacionId);

        try {

            if (!cuentaId) {
                navigate('/login');
            } else {
                if (esFavorito) {
                    // Eliminamos de favoritos
                    await axios.delete('http://localhost:8080/favoritos', {
                        data: { cuentaId, habitacionId }, // Asegúrate de que los datos van en el cuerpo
                        headers: { 'Content-Type': 'application/json' } // Envía como JSON
                    });

                    setFavoritos(favoritos.filter(fav => fav.habitacion.id !== habitacionId));
                } else {
                    // Agrega a favoritos
                    const response = await axios.post('http://localhost:8080/favoritos',
                        {
                            cuentaId, habitacionId  // Usamos params en el caso de POST

                        });
                    setFavoritos([...favoritos, response.data]);
                }
            }





        } catch (error) {
            console.log('Error al actualizar el estado del favorito:', error);
        }
    };

    const esFavorito = (habitacionId) => {
        return favoritos.some(fav => fav.habitacion.id === habitacionId);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Habitaciones Disponibles</h2>

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

            {habitacionesMostradas.length > 0 ? (
                <div className="row">
                    {habitacionesMostradas.map((habitacion) => {
                        const { promedioEstrellas, cantidadOpiniones } = opinionesPorHabitacion[habitacion.id] || { promedioEstrellas: 0, cantidadOpiniones: 0 };

                        return (
                            <div className="col-md-6 mb-4" key={habitacion.id}>
                                <div className="card h-100" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '15px', overflow: 'hidden' }}>
                                    {/* Imagen de la habitación */}
                                    <div style={{ flex: '1 0 40%', height: '200px', overflow: 'hidden' }}>
                                        <img
                                            src={`http://localhost:8080/${habitacion.id}/${habitacion.imagenes[0].nombre}`}
                                            alt={habitacion.nombre}
                                            className="img-fluid"
                                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                        />
                                        {/* Botón de favorito */}
                                        <button
                                            onClick={() => toggleFavorito(habitacion.id)}
                                            className="btn"
                                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent' }}
                                        >
                                            <i className="fa" style={{ color: esFavorito(habitacion.id) ? 'red' : 'grey', fontSize: '24px' }}>
                                                ♥
                                            </i>
                                        </button>
                                    </div>

                                    {/* Información de la habitación */}
                                    <div className="card-body" style={{ flex: '1 0 60%', padding: '15px', overflow: 'hidden', height: '200px' }}>
                                        <h5 className="card-title">{habitacion.nombre}</h5>
                                        <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{habitacion.descripcion}</p>
                                        <div className="d-flex justify-content-start align-items-center mb-3">
                                            <span className="badge" style={{ fontSize: '1.2rem', marginRight: '0.5rem', backgroundColor: '#28a745', color: '#fff', padding: '5px 10px' }}>
                                                {promedioEstrellas}
                                            </span>
                                            <div className="d-flex flex-column ms-2">
                                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#6C757D' }}>
                                                    {promedioEstrellas >= 4 ? 'Excelente' : 'Buena'}
                                                </span>
                                                <span className="text-muted">
                                                    {cantidadOpiniones} opiniones
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-end">
                                            <strong style={{ fontSize: '1.4rem', color: '#333' }}>
                                                ${formatearMiles(habitacion.precio)} CLP
                                            </strong>
                                            <a href={`/habitaciones/${habitacion.id}`} className="btn btn-primary" style={{ borderRadius: '10px', padding: '5px 15px' }}>
                                                Ver Detalles
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No se encontraron habitaciones disponibles.
                </div>
            )}

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
