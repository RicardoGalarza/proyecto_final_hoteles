import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';



const HeaderAdmin = () => {
  const location = useLocation(); // Obtenemos la ruta actual

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Admin</h1>
        <nav>
          {/* Solo mostrar los botones si NO estamos en la página de administración */}
          {location.pathname !== '/administracion' && (
            <>
              <Link to="/admin/crearhabitacion" className="btn btn-outline-light me-2">
                Crear Habitaciones
              </Link>
              <Link to="/admin/verhabitacion" className="btn btn-outline-light me-2">
                Ver Habitaciones
              </Link>
              <Link to="/" className="btn btn-outline-light">Salir</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdmin;

