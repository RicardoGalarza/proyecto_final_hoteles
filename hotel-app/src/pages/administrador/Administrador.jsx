import React, { useEffect, useState } from 'react';

const Administrador = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    if (isMobile) {
        return (
            <div className="container mt-5">
                <h1 className="text-center">Panel no disponible en dispositivos móviles</h1>
                <p className="text-center">Accede desde un ordenador para utilizar el panel de administración.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Panel de Administración</h1>
            <div className="card p-4 shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="mb-4 text-center">Bienvenido Administrador</h2>
                <p>Aquí puedes acceder a todas las funciones desarrolladas para la administración de tu negocio.</p>
                <ul>
                    <li><a href="/admin/crearhabitacion">Crear Habitacion</a></li>
                    <li><a href="/admin/VerHabitacion">Ver Habitaciones</a></li>
                    <li><a href="/admin/crear-categoria">crear categoria</a></li>
                    <li><a href="/admin/ver-categorias">ver categorias</a></li>
                    
                </ul>
                <p><em>Nota: Esta página no es accesible desde dispositivos móviles.</em></p>
            </div>
        </div>
    );
};

export default Administrador;
