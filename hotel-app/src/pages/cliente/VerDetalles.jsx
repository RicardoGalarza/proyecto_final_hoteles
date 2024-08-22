import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const VerDetalles = ({ imagenes }) => {
    const { id } = useParams();
    const habitacion = imagenes.find(habitacion => habitacion.id === parseInt(id, 10));

    if (!habitacion) {
        return <div>Habitación no encontrada</div>;
    }

    const imagenPrincipal = habitacion.images[0];
    const imagenesSecundarias = habitacion.images.slice(1, 5); // Asumiendo que solo se muestran 4 imágenes secundarias

    return (
        <div className="container pt-5 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{habitacion.name}</h2>
                <Link to="/" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left"></i> Volver
                </Link>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <img src={imagenPrincipal} alt="Imagen Principal" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div className="row">
                        {imagenesSecundarias.map((imagen, index) => (
                            <div className="col-6 mb-3" key={index}>
                                <img src={imagen} alt={`Imagen ${index + 2}`} className="img-fluid" />
                            </div>
                        ))}
                    </div>
                    <div className="text-end mt-2">
                        <Link to={`/galeria/${habitacion.id}`} className="btn btn-outline-primary">
                            Ver más
                        </Link>
                    </div>
                </div>
            </div>
            <p className="lead mt-4">{habitacion.description}</p>
            <h4 className="text-primary">{habitacion.price}</h4>
        </div>
    );
};

export default VerDetalles;
