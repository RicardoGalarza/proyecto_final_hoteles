import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap'; // Importa el componente Alert de Bootstrap
import { useNavigate, useParams } from 'react-router-dom';

const AdministrarCaracteristicas = () => {
    const { id } = useParams(); // Para obtener el ID de la habitación desde la URL
    const navigate = useNavigate();

    const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
    const [habitacion, setHabitacion] = useState(null);
    const [alerta, setAlerta] = useState({ mostrar: false, mensaje: '', tipo: '' }); // Estado para la alerta de Bootstrap

    const caracteristicasDisponibles = [
        'Piscina', 'Parking gratis', 'Gimnasio', 'Habitaciones sin humo',
        'Recepción 24 horas', 'Restaurante', 'Bar', 'Muy buen desayuno'
    ];

    useEffect(() => {
        // Obtener la habitación por ID para ver las características seleccionadas
        axios.get(`http://localhost:8080/habitaciones/${id}`)
            .then(response => {
                setHabitacion(response.data);
                setCaracteristicasSeleccionadas(response.data.caracteristicas || []);
            })
            .catch(error => {
                console.error('Hubo un error al obtener la habitación:', error);
            });
    }, [id]);

    const manejarCheckbox = (caracteristica) => {
        if (caracteristicasSeleccionadas.includes(caracteristica)) {
            // Remover la característica si ya está seleccionada
            setCaracteristicasSeleccionadas(caracteristicasSeleccionadas.filter(c => c !== caracteristica));
        } else {
            // Agregar la característica si no está seleccionada
            setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas, caracteristica]);
        }
    };

    const guardarCambios = () => {
        console.log("Características seleccionadas:", caracteristicasSeleccionadas);
        axios.put(`http://localhost:8080/habitaciones/${id}/caracteristicas`, 
            caracteristicasSeleccionadas  // Solo la lista de strings, sin objeto extra
        )
        .then(() => {
            setAlerta({ mostrar: true, mensaje: 'Características guardadas correctamente', tipo: 'success' });
            setTimeout(() => {
                navigate('/admin/verhabitacion'); // Redirigir después de 3 segundos
            }, 3000);
        })
        .catch(error => {
            setAlerta({ mostrar: true, mensaje: 'Hubo un error al guardar las características', tipo: 'danger' });
            console.error('Hubo un error al guardar las características:', error);
        });
    };

    return (
        <div className="container mt-5">
            <h2>Administrar Características para {habitacion?.nombre}</h2>

            {/* Alerta de Bootstrap */}
            {alerta.mostrar && (
                <Alert variant={alerta.tipo} onClose={() => setAlerta({ mostrar: false })} dismissible>
                    {alerta.mensaje}
                </Alert>
            )}

            <form>
                {caracteristicasDisponibles.map((caracteristica, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`caracteristica-${index}`}
                            checked={caracteristicasSeleccionadas.includes(caracteristica)}
                            onChange={() => manejarCheckbox(caracteristica)}
                        />
                        <label className="form-check-label" htmlFor={`caracteristica-${index}`}>
                            {caracteristica}
                        </label>
                    </div>
                ))}

                <button type="button" className="btn btn-primary mt-3 me-2" onClick={guardarCambios}>
                    Guardar Características
                </button>

                {/* Botón de Cancelar*/}
                <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default AdministrarCaracteristicas;
