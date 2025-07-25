import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="sb-sidenav-menu-heading mt-4">Menú</div>

          <div className="nav">
            <Link className="nav-link" to="/">
              <div className="sb-nav-link-icon"><i className="fas fa-home"></i></div>
              Inicio
            </Link>

            <Link className="nav-link" to="/estudiantes">
              <div className="sb-nav-link-icon"><i className="fas fa-user-graduate"></i></div>
              Estudiantes
            </Link>

            <Link className="nav-link" to="/reportes">
              <div className="sb-nav-link-icon"><i className="fas fa-chart-bar"></i></div>
              Reportes
            </Link>

            <Link className="nav-link" to="/configuracion">
              <div className="sb-nav-link-icon"><i className="fas fa-cog"></i></div>
              Configuración
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}


  /*
  menú lateral (sidenav)
  - Inicio (fas fa-home)
  - Estudiantes (fas fa-user-graduate)
  - Reportes (fas fa-chart-bar)
  - Configuración (fas fa-cog) */

export default Sidebar;