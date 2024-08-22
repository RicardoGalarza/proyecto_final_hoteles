import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({
    destino: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la búsqueda
    console.log('Búsqueda:', formData);
  };
  const rooms = [
    { id: 1, name: 'Suite Presidencial', price: '$300 por noche', description: 'Habitación de lujo con vista al mar.' },
    { id: 2, name: 'Habitación Doble', price: '$150 por noche', description: 'Habitación cómoda para dos personas.' },
    { id: 3, name: 'Habitación Individual', price: '$100 por noche', description: 'Ideal para viajeros solitarios.' },
    { id: 4, name: 'Suite Presidencial', price: '$300 por noche', description: 'Habitación de lujo con vista al mar.' },
    { id: 5, name: 'Habitación Doble', price: '$150 por noche', description: 'Habitación cómoda para dos personas.' },
    { id: 6, name: 'Habitación Individual', price: '$100 por noche', description: 'Ideal para viajeros solitarios.' },
    { id: 7, name: 'Suite Presidencial', price: '$300 por noche', description: 'Habitación de lujo con vista al mar.' },
    { id: 8, name: 'Habitación Doble', price: '$150 por noche', description: 'Habitación cómoda para dos personas.' },
    { id: 9, name: 'Habitación Individual', price: '$100 por noche', description: 'Ideal para viajeros solitarios.' },
    { id: 10, name: 'Habitación Individual', price: '$100 por noche', description: 'Ideal para viajeros solitarios.' },

  ];
  return (
    
      <div className="container mt-5 pt-5">
        {/* Sección de Habitaciones Disponibles */}
        <h2 className="mb-4">Habitaciones Disponibles</h2>
        <div className="row">
          {rooms.map((room) => (
            <div className="col-6 col-md-6 col-lg-6 mb-4" key={room.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <p className="card-text">{room.price}</p>
                  <Link to={`/verdetalles/${room.id}`} className="btn btn-primary">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Sección de Habitaciones Recomendadas */}
        <div className="mt-4">
          <h2 className="mb-4">Habitaciones Recomendadas</h2>
          <div className="row">
            {rooms.map((room) => (
              <div className="col-lg-4 col-md-6 mb-4" key={room.id}>
                <div className="card shadow-sm">
                  <img src={room.imageUrl} className="card-img-top" alt={room.name} />
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text">{room.description}</p>
                    <p className="card-text">
                      <strong>${room.price}</strong> por noche
                    </p>
                    <Link to={`/verdetalles/${room.id}`} className="btn btn-primary">
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

};

export default Home;
