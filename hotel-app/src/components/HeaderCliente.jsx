import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderCliente = () => {
    return (
        <header className="bg-light py-3 fixed-top">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="text-dark text-decoration-none d-flex align-items-center">
                    <img
                        src="https://img.freepik.com/vector-premium/logo-diseno-hotel_423075-16.jpg"
                        alt="Logo de la empresa"
                        className="rounded-circle"
                        style={{ height: '40px', width: '40px', marginRight: '10px' }}
                    />
                    <h1 className="h3 mb-0">Hotel</h1>
                </Link>
                <nav>
                    <Link to="/crearcuentacliente" className="btn btn-primary me-2">Crear cuenta</Link>
                    {/* <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link> */}
                </nav>
            </div>
        </header>
    );
}

export default HeaderCliente;
