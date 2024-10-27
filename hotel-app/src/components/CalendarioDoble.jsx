import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import axios from 'axios';

const CalendarioDoble = ({ habitacionId }) => {
  // Estado para almacenar las fechas no disponibles
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  const [error, setError] = useState(null);

  // Mes actual y siguiente
  const mesActual = new Date();
  const mesSiguiente = addMonths(mesActual, 1);

  // Función para obtener fechas no disponibles desde la API
  useEffect(() => {
    const fetchFechasNoDisponibles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reserva/fechas-no-disponibles/habitacion/${habitacionId}`);
        setFechasNoDisponibles(response.data); // Asume que la API retorna un array de strings con formato 'yyyy-MM-dd'
      } catch (err) {
        setError('Error al cargar las fechas no disponibles');
      }
    };

    fetchFechasNoDisponibles();
  }, [habitacionId]);

  // Función para generar días del mes y marcar no disponibles
  const generarDiasMes = (mes) => {
    const inicioMes = startOfMonth(mes);
    const finMes = endOfMonth(mes);
    return eachDayOfInterval({ start: inicioMes, end: finMes }).map((dia) => ({
      fecha: dia,
      noDisponible: fechasNoDisponibles.includes(format(dia, 'yyyy-MM-dd')),
    }));
  };

  // Días de cada mes
  const diasMesActual = generarDiasMes(mesActual);
  const diasMesSiguiente = generarDiasMes(mesSiguiente);

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Mes actual */}
        <div className="col">
          <h5>{format(mesActual, 'MMMM yyyy')}</h5>
          <div className="d-flex flex-wrap">
            {diasMesActual.map((dia, index) => (
              <div
                key={index}
                className={`p-2 border ${dia.noDisponible ? '#3c3c3c' : 'transparent'}`}
                style={{
                    width: '14.28%',
                    textAlign: 'center',
                    backgroundColor: dia.noDisponible ? '#eeeeee' : 'transparent', // Color hexadecimal
                    color: dia.noDisponible ? 'white' : 'black' // Color de texto opcional
                }}
              >
                {format(dia.fecha, 'd')}
              </div>
            ))}
          </div>
        </div>

        {/* Mes siguiente */}
        <div className="col">
          <h5>{format(mesSiguiente, 'MMMM yyyy')}</h5>
          <div className="d-flex flex-wrap">
            {diasMesSiguiente.map((dia, index) => (
              <div
                key={index}
                className={`p-2 border ${dia.noDisponible ? 'bg-secondary text-white' : ''}`}
                style={{
                    width: '14.28%',
                    textAlign: 'center',
                    backgroundColor: dia.noDisponible ? '#eeeeee' : 'transparent', // Color hexadecimal
                    color: dia.noDisponible ? 'white' : 'black' // Color de texto opcional
                }}
              >
                {format(dia.fecha, 'd')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioDoble;
