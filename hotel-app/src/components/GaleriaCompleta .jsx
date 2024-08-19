import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GaleriaCompleta = ({ imagenes }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const habitacion = imagenes.find(habitacion => habitacion.id === parseInt(id, 10));

    if (!habitacion || !habitacion.images || habitacion.images.length === 0) {
        return <div>Habitación no encontrada o sin imágenes</div>;
    }

    const handleVolver = () => {
        navigate(`/verdetalles/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2>Galería Completa</h2>
            <div className="row mb-3">
                {habitacion.images.map((image, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <img src={image} alt={`Imagen ${index + 1}`} className="img-fluid" />
                    </div>
                ))}
            </div>
            <div className="text-end">
                <button onClick={handleVolver} className="btn btn-primary">
                    Volver Atrás
                </button>
            </div>
        </div>
    );
};

export default GaleriaCompleta;
