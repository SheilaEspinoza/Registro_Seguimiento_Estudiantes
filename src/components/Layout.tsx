import type { ReactNode } from "react";
import Header from "./Header";

/* Children = contenido dinámico - páginas del menú */
function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion custom-sidenav" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <a className="nav-link" href="/">Inicio</a>
                <a className="nav-link" href="/estudiantes">Estudiantes</a>
                <a className="nav-link" href="/reportes">Reportes</a>
                <a className="nav-link" href="/configuracion">Configuración</a>
              </div>
            </div>
          </nav>
        </div>

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
