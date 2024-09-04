import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import HabitacionesDisponibles from '../components/HabitacionesDisponibles';
const Home = () => {


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
      <div>
        <div className="container mt-5">
          

          {/* Renderiza el componente de habitaciones disponibles */}
          <HabitacionesDisponibles />
          
        </div>
      </div>

    </div>
  );
};



export default Home;
