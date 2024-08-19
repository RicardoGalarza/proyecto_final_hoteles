import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Habitaciones = () => {
    // Simulación de datos de habitaciones
    const rooms = [
        { id: 1, name: 'Suite Presidencial', price: '$300 por noche', description: 'Habitación de lujo con vista al mar.' },
        { id: 2, name: 'Habitación Doble', price: '$150 por noche', description: 'Habitación cómoda para dos personas.' },
        { id: 3, name: 'Habitación Individual', price: '$100 por noche', description: 'Ideal para viajeros solitarios.' },
    ];

    return (
        <div className="container mt-4">
            <h2>Habitaciones Disponibles</h2>
            <div className="row">
                {rooms.map(room => (
                    <div className="col-md-4" key={room.id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{room.name}</h5>
                                <p className="card-text">{room.description}</p>
                                <p className="card-text">{room.price}</p>
                                <Link to={`/admin/habitaciones/${room.id}`} className="btn btn-primary">Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;
