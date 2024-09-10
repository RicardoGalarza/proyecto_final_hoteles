import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VerCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener categorías
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categorias');
                console.log('Datos recibidos:', response.data); // Revisa qué datos estás recibiendo
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        obtenerCategorias();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Listado de Categorías</h2>
            {categorias.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.descripcion}</td>
                                <td>{categoria.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay categorías disponibles</p>
            )}
            </div>
            );
};

export default VerCategorias;
