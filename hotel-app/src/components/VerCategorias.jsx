import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VerCategorias = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas
    const [showModal, setShowModal] = useState(false);
    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' });

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

    const handleEditar = (id) => {
        navigate(`/admin/editar-categoria/${id}`);
    };

    const handleClose = () => setShowModal(false);

    const handleShow = (categoria) => {
        setCategoriaAEliminar(categoria);
        setShowModal(true);
    };

    const eliminarCategoria = () => {
        if (categoriaAEliminar) {
            axios.delete(`http://localhost:8080/categorias/${categoriaAEliminar.id}`)
                .then(() => {
                    setCategorias(categorias.filter(categoria => categoria.id !== categoriaAEliminar.id));
                    setAlerta({
                        visible: true,
                        mensaje: 'Categoria eliminada con éxito',
                        tipo: 'success'
                    });
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Hubo un error al eliminar la categoria:', error);
                    setAlerta({
                        visible: true,
                        mensaje: 'No se pudo eliminar la categoria',
                        tipo: 'danger'
                    });
                    setShowModal(false);
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Listado de Categorías</h2>

            {alerta.visible && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {categorias.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.descripcion}</td>
                                <td>
                                    <button className="btn btn-secondary me-2" onClick={() => handleEditar(categoria.id)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleShow(categoria)}>Eliminar</button>
                                </td>
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


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar esta categoria?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={eliminarCategoria}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default VerCategorias;
