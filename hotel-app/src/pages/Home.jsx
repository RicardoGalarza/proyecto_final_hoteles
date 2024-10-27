import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HabitacionesDisponibles from '../components/HabitacionesDisponibles';
import axios from 'axios';

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });

  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [fechaLlegada, setFechaLlegada] = useState(null);
  const [fechaSalida, setFechaSalida] = useState(null);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]); // Nuevo estado para almacenar los resultados filtrados

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ciudades');
        setCiudades(response.data);
      } catch (error) {
        console.error("Error al obtener las ciudades", error);
      }
    };
    fetchCiudades();

    const fetchHabitaciones = async () => {
      try {
        const response = await fetch('http://localhost:8080/habitaciones');
        const data = await response.json();
        setResultadosFiltrados(data);
      } catch (error) {
        console.log('Error al cargar habitaciones:', error);
      }
    };

    fetchHabitaciones()
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/habitaciones/filtrar`, {
        params: {
          destino: ciudadSeleccionada,
          fechaLlegada: startDate ? startDate.toISOString().split('T')[0] : null,
          fechaSalida: endDate ? endDate.toISOString().split('T')[0] : null,
          adultos: guests.adults,
          ninos: guests.children,
        },
      });
      setResultadosFiltrados(response.data); // Guardar los resultados de la búsqueda
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  const handleGuestChange = (type, action) => {
    setGuests((prev) => ({
      ...prev,
      [type]: action === 'increase' ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="card p-4 shadow-lg rounded-lg" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '20px' }}>
        <h2 className="mb-4 text-center">Hoteles en Chile</h2>
        <form onSubmit={handleSearch}>
          <div className="row">
            {/* Selector de Ciudad */}
            <div className="col-md-12 mb-3">
              <label htmlFor="destination" className="form-label">¿A dónde quieres ir?</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <select
                  id="destination"
                  className="form-select"
                  value={ciudadSeleccionada}
                  onChange={(e) => setCiudadSeleccionada(e.target.value)}
                  required
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campo para Fechas */}
            <div className="col-md-12 mb-3">
              <label htmlFor="dates" className="form-label">Fechas</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar"></i>
                </span>
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="form-control w-100"
                  placeholderText="Selecciona fechas"
                  dateFormat="dd/MM/yyyy"
                  monthsShown={2}
                  required
                />
              </div>
            </div>

            {/* Selector de Huéspedes */}
            <div className="col-md-12 mb-4">
              <label htmlFor="guests" className="form-label">Huéspedes</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-people-fill"></i>
                </span>
                <button
                  type="button"
                  className="form-control text-start"
                  onClick={() => setShowGuests(!showGuests)}
                >
                  {guests.adults} adultos, {guests.children} niños
                </button>
              </div>
            </div>

            {showGuests && (
              <div className="mt-2 p-3 border rounded" style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span className="me-3">Adultos</span>
                  <div className="d-flex align-items-center">
                    <button type="button" onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(prev.adults - 1, 1) }))}>-</button>
                    <span className="mx-2">{guests.adults}</span>
                    <button type="button" onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}>+</button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="me-3">Niños</span>
                  <div className="d-flex align-items-center">
                    <button type="button" onClick={() => setGuests(prev => ({ ...prev, children: Math.max(prev.children - 1, 0) }))}>-</button>
                    <span className="mx-2">{guests.children}</span>
                    <button type="button" onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}>+</button>
                  </div>
                </div>
                <button type="button" className="btn btn-primary mt-3" onClick={() => setShowGuests(false)}>Listo</button>
              </div>
            )}

            {/* Botón de Búsqueda */}
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary w-100">Buscar</button>
            </div>
          </div>
        </form>
      </div>


      <div className="container">
        <HabitacionesDisponibles habitacionesFiltradas={resultadosFiltrados} />
      </div>

    </div>


  );
};
<style>
  {`
  .custom-datepicker-popper {
    z-index: 10050 !important;
  }
`}
</style>

export default Home;
