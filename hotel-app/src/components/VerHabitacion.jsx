import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VerHabitacion = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a tu API
    axios.get('http://localhost:8080/habitaciones')
      .then(response => {
        setProductos(response.data); // Asignar los datos de la API al estado
      })
      .catch(error => {
        console.error('Hubo un error al obtener las habitaciones:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Habitaciones</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>
                {/* Aquí puedes agregar botones de acción, como "Ver", "Editar", "Eliminar" */}
                <button className="btn btn-primary me-2">Ver</button>
                <button className="btn btn-secondary me-2">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerHabitacion;
