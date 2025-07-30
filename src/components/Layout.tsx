import type { ReactNode } from "react";
import Header from "./Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div id="layoutSidenav" style={{ display: "flex", minHeight: "100vh" }}>
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
            <div className="contenido-layout-principal">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
