
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CrearCuentaCliente from './components/CrearCuentaCliente';
import FooterAdmin from './components/FooterAdmin';
import FooterCliente from './components/FooterCliente';
import GaleriaCompleta from './components/GaleriaCompleta ';
import HeaderAdmin from './components/HeaderAdmin';
import HeaderCliente from './components/HeaderCliente';
import HeaderLoginAdmin from './components/HeaderLoginAdmin';
import HeaderLoginCliente from './components/HeaderLoginCliente';
import VerHabitacion from './components/VerHabitacion';
import Administrador from './pages/administrador/Administrador';
import AdminLogin from './pages/administrador/AdminLogin';
import Habitaciones from './pages/administrador/Habitaciones';
import RegistrarHabitacion from './pages/administrador/RegistrarHabitacion';
import ClienteLogin from './pages/cliente/ClienteLogin';
import VerDetalles from './pages/cliente/VerDetalles';
import Home from './pages/Home';

import CrearCategoria from './components/CrearCategoria';
import VerCategorias from './components/VerCategorias';
import NotFound from './pages/NotFound';
import './styles/_custom.scss';




function App() {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname.startsWith('/admin')) {
      return <HeaderAdmin />;
    }
    if (location.pathname === '/login') {
      return <HeaderLoginCliente />;
    }
    if (location.pathname === '/loginadmin') {
      return <HeaderLoginAdmin />;
    }
    return <HeaderCliente />;
  };

  const renderFooter = () => {
    if (location.pathname.startsWith('/admin')) {
      return <FooterAdmin />;
    }
    if (location.pathname === '/login') {
      return null;
    }
    return <FooterCliente />;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {renderHeader()}
      <main className="flex-grow-1">
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<ClienteLogin />} />
            <Route path="/admin/crearhabitacion" element={<RegistrarHabitacion />} />
            <Route path="/admin/habitaciones" element={<Habitaciones />} />
            <Route path="/verdetalles/:id" element={<VerDetalles />} />
            <Route path="/galeria-completa/:id" element={<GaleriaCompleta />} />
            <Route path="/habitaciones/:id" element={<VerDetalles />} />
            <Route path="/crearcuentacliente" element={<CrearCuentaCliente />} />
            <Route path="/admin/verhabitacion" element={<VerHabitacion />} />
            <Route path="/Admin" element={<AdminLogin />} />
            <Route path="/administracion" element={<Administrador />} />
            <Route path="/admin/crear-categoria" element={<CrearCategoria />} />
            <Route path="/admin/ver-categorias" element={<VerCategorias />} />
            {/* Otras rutas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      {renderFooter()}
    </div>
  );
}

export default App;
