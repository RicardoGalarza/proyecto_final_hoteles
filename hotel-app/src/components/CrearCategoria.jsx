import axios from 'axios'; // Para hacer peticiones a tu API
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearCategoria = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaCategoria = {
            nombre,
            descripcion,
            estado
        };

        try {
            // Envía la categoría a tu API para guardarla
            await axios.post('http://localhost:8080/categorias', nuevaCategoria);
            alert('Categoría creada con éxito');

            // Navega de vuelta a la página de administración o lista de categorías
            navigate('/admin/vercategorias');
        } catch (error) {
            console.error('Hubo un error al crear la categoría:', error);
            alert('No se pudo crear la categoría');
        }
    };

    const handleSelect = (eventKey) => {
        // El título del botón permanece siempre como "Crear Categoría"
        if (eventKey === 'crearCategoria') {
            // Ya estamos en Crear Categoría
        } else if (eventKey === 'verCategorias') {
            navigate('/admin/vercategorias');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Categorias</h2>
            {/* Formulario para crear la categoría */}
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

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                        className="form-select"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Crear Categoría</button>
            </form>
        </div>
    );
};

export default CrearCategoria;
