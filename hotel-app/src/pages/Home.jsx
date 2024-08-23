import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {



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
    <div className="py-5" style={{ marginTop: '90px', backgroundColor: '#FFFFFF' }}>
  <div className="container" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#A52A2A', padding: '20px', borderRadius: '8px' }}>
    <h2 className="text-white mb-4 text-center">Busca ofertas de Habitaciones</h2>
    <div className="row">
      {/* Campo de ubicación */}
      <div className="col-12 col-md-5 mb-3 mb-md-0">
        <input type="text" className="form-control" placeholder="¿Santiago, Chile?" />
      </div>
      
      {/* Campo de check-in y check-out */}
      <div className="col-12 col-md-5 mb-3 mb-md-0">
        <input type="text" className="form-control" placeholder="Check-in - Check-out" />
      </div>
      
      {/* Botón de búsqueda */}
      <div className="col-12 col-md-2">
        <button className="btn btn-success w-100">Buscar</button>
      </div>
    </div>
  </div>


      {/* Habitaciones Disponibles */}
      <div className="container mt-4">
        <h2>Habitaciones Disponibles</h2>
        <div className="row">
          {rooms.map(room => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={room.id}>
              <div className="card">
                <img src={room.imageUrl} className="card-img-top" alt={room.name} />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <p className="card-text">{room.price}</p>
                  <Link to={`/verdetalles/${room.id}`} className="btn btn-primary">Ver Detalles</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habitaciones Recomendadas */}
      <div className="container mt-4">
        <h2 className="mb-4">Habitaciones Recomendadas</h2>
        <div className="row">
          {rooms.map(room => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={room.id}>
              <div className="card shadow-sm">
                <img src={room.imageUrl} className="card-img-top" alt={room.name} />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <p className="card-text">
                    <strong>{room.price}</strong> por noche
                  </p>
                  <Link to={`/verdetalles/${room.id}`} className="btn btn-primary">Ver Detalles</Link>
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
