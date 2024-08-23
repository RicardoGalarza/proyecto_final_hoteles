
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CrearCuentaCliente from './components/CrearCuentaCliente';
import FooterAdmin from './components/FooterAdmin';
import FooterCliente from './components/FooterCliente';
import GaleriaCompleta from './components/GaleriaCompleta ';
import GaleriaImagenes from './components/GaleriaImagenes ';
import HeaderAdmin from './components/HeaderAdmin';
import HeaderCliente from './components/HeaderCliente';
import HeaderLoginAdmin from './components/HeaderLoginAdmin';
import HeaderLoginCliente from './components/HeaderLoginCliente';
import VerHabitacion from './components/VerHabitacion';
import AdminLogin from './pages/administrador/AdminLogin';
import Habitaciones from './pages/administrador/Habitaciones';
import RegistrarHabitacion from './pages/administrador/RegistrarHabitacion';
import ClienteLogin from './pages/cliente/ClienteLogin';
import VerDetalles from './pages/cliente/VerDetalles';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './styles/_custom.scss';

const imagenesEjemplo = [
  {
    id: 1,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 2,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 3,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 4,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 5,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 6,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 7,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 8,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 9,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  {
    id: 10,
    name: 'Suite Presidencial',
    images: [
      'https://via.placeholder.com/600x400?text=Imagen+Principal',
      'https://via.placeholder.com/300x300?text=Imagen+1',
      'https://via.placeholder.com/300x300?text=Imagen+2',
      'https://via.placeholder.com/300x300?text=Imagen+3',
      'https://via.placeholder.com/300x300?text=Imagen+4'
    ]
  },
  
];



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
            <Route path="/verdetalles/:id" element={<VerDetalles imagenes={imagenesEjemplo} />} />
            <Route path="/galeria" element={<GaleriaImagenes imagenes={imagenesEjemplo} />} />
            <Route path="/galeria/:id" element={<GaleriaCompleta imagenes={imagenesEjemplo} />} />
            <Route path="/loginadmin" element={<AdminLogin />} />
            <Route path="/crearcuentacliente" element={<CrearCuentaCliente />} />
            <Route path="/admin/verhabitacion" element={<VerHabitacion />} />

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
