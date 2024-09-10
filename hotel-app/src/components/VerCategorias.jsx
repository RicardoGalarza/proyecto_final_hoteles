import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const VerCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas

    const obtenerCategorias = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/categorias/pageable?page=${page - 1}&size=15`); 
            // Restamos 1 porque en Spring Boot, la paginación empieza en 0
            setCategorias(response.data.content); // Lista de categorías
            setTotalPaginas(response.data.totalPages); // Total de páginas
            setCurrentPage(page); // Actualiza la página actual
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    useEffect(() => {
        obtenerCategorias(1); // Cargar la primera página cuando el componente se monte
    }, []);

    const paginacion = (pageNumber) => {
        obtenerCategorias(pageNumber);
    };

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
                <div className="alert alert-warning" role="alert">
                    No se encontraron categorías disponibles.
                </div>
            )}

            {/* Paginación */}
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => paginacion(1)} disabled={currentPage === 1} />
                {[...Array(totalPaginas).keys()].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginacion(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Last onClick={() => paginacion(totalPaginas)} disabled={currentPage === totalPaginas} />
            </Pagination>
        </div>
    );
};

export default VerCategorias;
