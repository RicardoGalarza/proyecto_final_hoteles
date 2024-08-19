// src/components/CrearCuentaCliente.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearCuentaCliente = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para registrar al cliente
        console.log({ username, email, password });
        // Después de registrar al cliente, redirige a la página de inicio de sesión
        navigate('/logincliente');
    };

    return (
        <div className="container mt-5">
            <h2>Crear cuenta</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
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
