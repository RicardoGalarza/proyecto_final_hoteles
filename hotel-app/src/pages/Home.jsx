import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HabitacionesDisponibles from '../components/HabitacionesDisponibles';

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });

  // Funciones para manejar el incremento y decremento de huéspedes
  const handleGuestChange = (type, action) => {
    setGuests((prev) => ({
      ...prev,
      [type]: action === 'increase' ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  return (
    <div className="container mt-5 pt-5">
      <div
        className="card p-4 shadow-lg rounded-lg"
        style={{
          maxWidth: '400px',  // Hacemos el buscador más cuadrado
          margin: '0 auto',   // Centramos el contenedor
          backgroundColor: '#ffffff', // Fondo blanco
          borderRadius: '20px', // Bordes redondeados
        }}
      >
        <h2 className="mb-4 text-center">Hoteles en Santiago</h2>
        <form>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="destination" className="form-label">
                ¿Adónde quieres ir?
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <input
                  type="text"
                  id="destination"
                  className="form-control"
                  placeholder="Santiago, Región Metropolitana de Santiago"
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="dates" className="form-label">
                Fechas
              </label>
              <div className="input-group rounded">
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
                  style={{ zIndex: 1000 }}
                  popperPlacement="right-end" // Ajusta la posición del calendario a la derecha
                />
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <label htmlFor="guests" className="form-label">
                Huéspedes
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-people-fill"></i>
                </span>
                <Button
                  variant="outline-secondary"
                  className="form-control text-start"
                  onClick={() => setShowGuests(!showGuests)}
                >
                  {guests.adults} adultos, {guests.children} niños
                </Button>
              </div>

              {showGuests && (
                <div className="mt-2 p-3 border rounded" style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="me-3">Adultos</span>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleGuestChange('adults', 'decrease')}
                      >
                        -
                      </Button>
                      <span className="mx-2">{guests.adults}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleGuestChange('adults', 'increase')}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-2 align-items-center">
                    <span className="me-3">Niños</span>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleGuestChange('children', 'decrease')}
                      >
                        -
                      </Button>
                      <span className="mx-2">{guests.children}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleGuestChange('children', 'increase')}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Botón de "Listo" */}
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={() => setShowGuests(false)}  // Cierra el modal de selección de huéspedes
                    >
                      Listo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Buscar
          </button>
        </form>
      </div>
      <HabitacionesDisponibles />

    </div>
  );
};

export default Home;
