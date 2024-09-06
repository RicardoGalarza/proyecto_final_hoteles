import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // useParams para obtener el ID de la URL

const VerDetalles = () => {
    const { id } = useParams(); // Obtener el ID de la habitación desde la URL
    const [habitacion, setHabitacion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabitacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/habitaciones/${id}`);
                setHabitacion(response.data); // Guardar los datos de la habitación
            } catch (err) {
                setError('Hubo un error al obtener los detalles de la habitación.');
            }
        };

        fetchHabitacion(); // Llamada a la función para obtener la habitación
    }, [id]); // El efecto se ejecuta cuando cambia el ID

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!habitacion) {
        return <div>Cargando detalles...</div>;
    }

    return (
        <div className="container py-5">
    {/* Mostrar el nombre de la habitación */}
    <h2 className="text-center mb-4">{habitacion.nombre}</h2>
    <div className="row">
      {/* Imagen grande en el lado izquierdo */}
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

      {/* Cuatro imágenes en el lado derecho */}
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
            <div className="text-center mt-4">
                <p>{habitacion.descripcion}</p>
                <p><strong>Precio:</strong> {habitacion.precio}</p>

                {/* Separación entre los botones */}
                <div className="d-flex justify-content-center mt-3">
                    <Link to={`/galeria-completa/${habitacion.id}`} className="btn btn-primary mx-3">
                        Ver más
                    </Link>
                    <Link to="/" className="btn btn-primary mx-3">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerDetalles;
