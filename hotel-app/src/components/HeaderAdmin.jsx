import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    // Navega según la opción seleccionada sin cambiar el título del botón
    if (eventKey === 'Crear Habitaciones') {
      navigate('/admin/crearhabitacion');
    } else if (eventKey === 'Ver Habitaciones') {
      navigate('/admin/verhabitacion');
    }
  };

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Admin</h1>
        <nav className="d-flex">
          <DropdownButton
            id="dropdown-basic-button"
            title="Habitaciones"  // El título siempre será "Habitaciones"
            onSelect={handleSelect}
            variant="warning"
            className="me-2"
          >
            <Dropdown.Item eventKey="Crear Habitaciones">Crear Habitaciones</Dropdown.Item>
            <Dropdown.Item eventKey="Ver Habitaciones">Ver Habitaciones</Dropdown.Item>
          </DropdownButton>

          <button className="btn btn-light" onClick={() => navigate('/')}>
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAdmin;
