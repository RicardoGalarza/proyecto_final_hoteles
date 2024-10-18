import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CrearCategoria = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false); // Estado para controlar la alerta
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaCategoria = {
            nombre,
            descripcion,
            estado,
        };

        try {
            // Envía la categoría a tu API para guardarla
            await axios.post('http://localhost:8080/categorias', nuevaCategoria);
            
            // Mostrar la alerta de éxito
            setMostrarAlerta(true);

            // Navegar de vuelta a la página de administración después de un tiempo
            setTimeout(() => {
                setMostrarAlerta(false);
                navigate('/admin/ver-categorias');
            }, 3000); // Espera 3 segundos antes de redirigir
        } catch (error) {
            console.error('Hubo un error al crear la categoría:', error);
            alert('No se pudo crear la categoría');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Categorías</h2>

            {/* Mostrar la alerta si la categoría fue creada con éxito */}
            {mostrarAlerta && (
                <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
                    Categoría creada con éxito
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                

                <button type="submit" className="btn btn-primary">Crear Categoría</button>
            </form>
        </div>
    );
};

export default CrearCategoria;
