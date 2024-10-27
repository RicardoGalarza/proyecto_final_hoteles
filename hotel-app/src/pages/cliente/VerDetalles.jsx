import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Pagination } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Importa iconos de corazón para favorito
import Rating from 'react-rating-stars-component'; // Importa la librería de estrellas
import { Link, useParams } from 'react-router-dom';
import PoliticasProducto from '../../components/PoliticasProducto';
import { useNavigate } from 'react-router-dom';
import CalendarioDoble from '../../components/CalendarioDoble';

const VerDetalles = () => {
    const { id } = useParams();
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);
    const [opiniones, setOpiniones] = useState([]);
    const [nuevaOpinion, setNuevaOpinion] = useState({ estrellas: 0, opinion: '' }); // Para manejar la opinión y las estrellas
    const [favorito, setFavorito] = useState(false); // Estado para manejar si es favorito o no
    const [politicas, setPoliticas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const opinionesPerPage = 3;

    // Función para calcular la puntuación media
    const calcularPuntuacionMedia = (opiniones) => {
        if (opiniones.length === 0) {
            return 0;
        }
        const totalEstrellas = opiniones.reduce((total, opinion) => total + opinion.estrellas, 0);
        return (totalEstrellas / opiniones.length).toFixed(1); // Puntuación media con 1 decimal
    };


    useEffect(() => {
        const fetchHabitacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/habitaciones/${id}`);
                setHabitacion(response.data);
            } catch (err) {
                setError('Hubo un error al obtener los detalles de la habitación.');
            }
        };

        const fetchOpiniones = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/opiniones/habitacion/${id}`);
                setOpiniones(response.data);
            } catch (err) {
                setError('Hubo un error al obtener las opiniones.');
            }
        };

        const cuentaId = JSON.parse(localStorage.getItem('userId'));

        const fetchFavorito = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/favoritos/cuenta/${cuentaId}`);
                const esFavorito = response.data.some(fav => fav.habitacion.id === parseInt(id));
                setFavorito(esFavorito);
            } catch (err) {
                setError('Hubo un error al verificar si es favorito.');
            }
        };



        const fetchPoliticas = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/habitaciones/${id}/politicas`);
                setPoliticas(response.data); // Asume que response.data es un array de políticas
            } catch (err) {
                setError('Error al cargar las políticas');
            } finally {
                setLoading(false);
            }
        };

        fetchPoliticas();
        fetchHabitacion();
        fetchOpiniones();

        if (cuentaId > 0) {
            fetchFavorito();
        }

    }, [id]);

    // Puntuación media calculada
    const puntuacionMedia = calcularPuntuacionMedia(opiniones);

    const formatearMiles = (numero) => {
        return numero.toLocaleString('es-ES');
    };
      

    const handleOpinionChange = (event) => {
        const { name, value } = event.target;
        setNuevaOpinion((prevOpinion) => ({ ...prevOpinion, [name]: value }));
    };

    const handleRatingChange = (newRating) => {
        setNuevaOpinion((prevOpinion) => ({ ...prevOpinion, estrellas: newRating }));
    };

    const handleSubmitOpinion = async (event) => {
        event.preventDefault();
        try {
            if (nuevaOpinion.opinion == null) {
                nuevaOpinion.opinion = ' ';
            }
            const cuentaLogueado = JSON.parse(localStorage.getItem('userId'));
            if(!cuentaLogueado){
                navigate('/login');
            }else{
                const response = await axios.post(`http://localhost:8080/opiniones`, {
                    habitacionId: id,
                    cuentaId: cuentaLogueado, // Cambia esto para obtener el ID de la cuenta actual si lo tienes
                    estrellas: nuevaOpinion.estrellas,
                    opinion: nuevaOpinion.opinion,
                });
    
                setOpiniones([...opiniones, response.data]);
                setNuevaOpinion({ estrellas: 0, opinion: '' });
            }
            

        } catch (err) {
            setError('Hubo un error al enviar la opinión.');   
        }
    };

    // Función para marcar/desmarcar como favorito
    const toggleFavorito = async () => {
        const cuentaId = parseInt(localStorage.getItem('userId'), 10);
        console.log(cuentaId);

        try {
            if (!cuentaId) {
                navigate('/login');
            } else {
                if (favorito) {
                    await axios.delete(`http://localhost:8080/favoritos`, {
                        data: { // Aquí enviamos los datos en el cuerpo
                            cuentaId: parseInt(cuentaId),
                            habitacionId: parseInt(id),
                        }
                    });
                } else {
                    await axios.post(`http://localhost:8080/favoritos`, {
                        cuentaId: parseInt(cuentaId),
                        habitacionId: parseInt(id),
                    });
                }

                setFavorito(!favorito);
            }
        } catch (err) {
            console.error(error);
            setError('Hubo un error al actualizar el estado del favorito.');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!habitacion) {
        return <div>Cargando detalles...</div>;
    }

    // Paginación
    const indexOfLastOpinion = currentPage * opinionesPerPage;
    const indexOfFirstOpinion = indexOfLastOpinion - opinionesPerPage;
    const currentOpiniones = opiniones.slice(indexOfFirstOpinion, indexOfLastOpinion);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-start mb-4">{habitacion.nombre}</h2>

                {/* Botón de Favorito */}
                <div className="d-flex justify-content-end">
                    <button
                        onClick={toggleFavorito}
                        className="btn btn-outline-primary d-flex align-items-center"
                        style={{
                            borderRadius: '50px',
                            padding: '10px',
                            borderColor: favorito ? 'red' : 'grey',
                        }}
                    >
                        {favorito ? (
                            <FaHeart color="red" size="24px" style={{ marginRight: '5px' }} />
                        ) : (
                            <FaHeart color="grey" size="24px" style={{ marginRight: '5px' }} />
                        )}
                        {favorito ? 'Guardada' : 'Favorito'}
                    </button>


                    {/* Botón de Compartir en WhatsApp */}
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Mira esta habitación: ${habitacion.nombre} - ${habitacion.descripcion}. Precio: ${habitacion.precio}. Link: http://localhost:8080/detalle/${habitacion.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary d-flex align-items-center ms-2"
                        style={{
                            borderRadius: '50px',
                            padding: '10px',
                        }}
                    >
                        <i className="fab fa-whatsapp" style={{ fontSize: '24px', marginRight: '5px' }}></i>
                        Compartir
                    </a>



                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card h-100 zoom">
                        <img
                            src={`http://localhost:8080/${habitacion.id}/${habitacion.imagenes[0].nombre}`}
                            alt="Imagen principal"
                            className="img-fluid"
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        {habitacion.imagenes.slice(1, 5).map((imagen, index) => (
                            <div className="col-md-6 mb-3" key={index}>
                                <div className="card h-100 zoom">
                                    <img
                                        src={`http://localhost:8080/${habitacion.id}/${imagen.nombre}`}
                                        alt={`Imagen ${index + 2}`}
                                        className="img-fluid"
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p>{habitacion.descripcion}</p>
                <p><strong>Precio:</strong> ${formatearMiles(habitacion.precio)} CLP</p>
                

                <div>
                    <strong>Categorías:</strong>
                    {habitacion.categorias.length > 0 ? (
                        habitacion.categorias.map((categoria) => (
                            <Badge key={categoria.id} bg="light" text="dark" className="me-1">
                                {categoria.nombre}
                            </Badge>
                        ))
                    ) : (
                        <span>Sin categoría</span>
                    )}
                </div>

                <CalendarioDoble habitacionId={habitacion.id} />




                <div className="d-flex justify-content-end mt-3">
                    <Link to={`/galeria-completa/${habitacion.id}`} className="btn btn-primary mx-3">
                        Ver más
                    </Link>
                    <Link to="/" className="btn btn-secondary mx-3">
                        Volver al inicio
                    </Link>
                </div>
            </div>


            <div>
                {loading ? (
                    <p>Cargando políticas...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <PoliticasProducto politicas={politicas} />
                )}
            </div>




















            {/* Nueva visualización de la puntuación media */}
            <div className="puntuacion-media mt-3 d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', backgroundColor: '#28a745', padding: '5px 10px', borderRadius: '5px' }}>
                        {puntuacionMedia}
                    </span>
                    <span className="ms-2" style={{ fontSize: '18px', fontWeight: 'bold', color: '#6c757d' }}>Excelente</span>
                </div>
                <span className="ms-3" style={{ color: '#6c757d' }}>{opiniones.length} opiniones</span>
            </div>

            <div className="mt-4">
                <h4>Dejar una opinión</h4>
                <form onSubmit={handleSubmitOpinion}>
                    <div className="mb-3">
                        <label htmlFor="estrellas" className="form-label">Puntaje (1 a 5 estrellas)</label>
                        <Rating
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={nuevaOpinion.estrellas}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="opinion" className="form-label">Opinión</label>
                        <textarea
                            className="form-control"
                            id="opinion"
                            name="opinion"
                            value={nuevaOpinion.opinion}
                            onChange={handleOpinionChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar Opinión</button>
                </form>
            </div>

            <div className="mt-4">
                <h3>Opiniones</h3>
                <div className="row">
                    {currentOpiniones.length > 0 ? (
                        currentOpiniones.map((opinion) => (
                            <div className="col-md-4 mb-3" key={opinion.id}>
                                <div className="card h-100" style={{ width: '20rem' }}> {/* Ajusta el ancho aquí */}
                                    <div className="card-body">
                                        <h5 className="card-title">Valoración: {opinion.estrellas} estrellas</h5>
                                        <p className="card-text">{opinion.opinion}</p>
                                        <p className="text-muted">{opinion.cuenta.nombre}</p>
                                        <p className="text-muted">{new Date(opinion.fechaCreacion).toLocaleDateString()}</p> {/* Fecha de creación */}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay opiniones disponibles para esta habitación.</p>
                    )}
                </div>

                {/* Botones de paginación */}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(opiniones.length / opinionesPerPage)}
                        />
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default VerDetalles;
