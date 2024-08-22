import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearCuentaCliente = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/cuentas', {
                usuario: username,
                correo: email,
                clave: password
            });

            console.log('Cuenta creada:', response.data);
            setMessage('Cuenta creada exitosamente.');
            setAlertType('success');
            setTimeout(() => {
                navigate('/login'); // Redirigir al login después de crear la cuenta
            }, 2000);
        } catch (error) {
            console.error('Error al crear la cuenta:', error);

            switch (error.response.data.message) {
                case "El nombre de usuario ya está en uso.":
                    setMessage('El nombre de usuario ya está en uso.');
                    break;
                case "El correo electrónico ya está en uso.":
                    setMessage("El correo electrónico ya está en uso.");
                    break;
                default:
                    break;
            }
            setAlertType('danger');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2>Crear cuenta</h2>
            {message && (
                <div className={`alert alert-${alertType} mt-3`} role="alert">
                    {message}
                </div>
            )}
            <form onSubmit={handleRegister} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear cuenta</button>
            </form>
        </div>
    );
};

export default CrearCuentaCliente;
