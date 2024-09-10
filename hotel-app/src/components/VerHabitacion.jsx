import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const VerHabitacion = () => {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' });

    useEffect(() => {
        axios.get('http://localhost:8080/habitaciones')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las habitaciones:', error);
            });
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = (producto) => {
        setProductoAEliminar(producto);
        setShowModal(true);
    };

    const eliminarHabitacion = () => {
        if (productoAEliminar) {
            axios.delete(`http://localhost:8080/habitaciones/${productoAEliminar.id}`)
                .then(() => {
                    setProductos(productos.filter(producto => producto.id !== productoAEliminar.id));
                    setAlerta({
                        visible: true,
                        mensaje: 'Habitación eliminada con éxito',
                        tipo: 'success'
                    });
                    setShowModal(false);  // Cierra el modal después de eliminar
                })
                .catch(error => {
                    console.error('Hubo un error al eliminar la habitación:', error);
                    setAlerta({
                        visible: true,
                        mensaje: 'No se pudo eliminar la habitación',
                        tipo: 'danger'
                    });
                    setShowModal(false);  // Cierra el modal en caso de error
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Habitaciones</h2>

            {/* Alerta de Bootstrap */}
            {alerta.visible && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

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
                                <button className="btn btn-primary me-2">Ver</button>
                                <button className="btn btn-secondary me-2">Editar</button>
                                <button className="btn btn-danger" onClick={() => handleShow(producto)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar esta habitación?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={eliminarHabitacion}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VerHabitacion;
