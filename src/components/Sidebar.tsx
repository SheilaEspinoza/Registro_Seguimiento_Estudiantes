import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="layoutSidenav_nav">
      <div className="sidebar-logo text-center py-3">
        <img src="/img/logo.png" alt="Logo" className="img-fluid logo-img" />
      </div>
      
        <div className="sb-sidenav-menu">
          <div
            className="sb-sidenav-menu-heading"
            style={{ textAlign: "center",
            marginTop: "8px"}}
          >
            Menú
          </div>

          <div className="nav">
            <Link className="nav-link d-flex align-items-center gap-2" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-home"></i>
              </div>
              Inicio
            </Link>

            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/estudiantes"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              Estudiantes
            </Link>

            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/reportes"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              Reportes
            </Link>

            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/configuracion"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-cog"></i>
              </div>
              Configuración
            </Link>
          </div>
        </div>

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
