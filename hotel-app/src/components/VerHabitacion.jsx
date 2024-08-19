// src/components/VerHabitacion.js
import React, { useEffect, useState } from 'react';

const VerHabitacion = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Aquí puedes realizar una llamada a tu API para obtener los productos
        // Ejemplo de datos
        const fetchedProductos = [
            { id: 1, nombre: 'Habitación Deluxe' },
            { id: 2, nombre: 'Habitación Estándar' },
            { id: 3, nombre: 'Suite Presidencial' },
        ];
        setProductos(fetchedProductos);
    }, []);

    return (
        <div className="container mt-5">
            <h2>Ver Habitación</h2>
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
