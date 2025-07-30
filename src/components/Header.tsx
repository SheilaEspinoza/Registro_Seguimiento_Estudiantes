import { useState } from "react";
import NotesPanel from "./NotesPanel";

const Header = () => {
  const [showNotes, setShowNotes] = useState(false);

  const toggleSidebar = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  return (
    <>
      <nav className="navbar app-header fixed-top shadow px-3 d-flex justify-content-between align-items-center" 
      style={{ zIndex: 9999 }}
      >
        {/* a la izq amburguesa y nombre */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-link btn-sm" onClick={toggleSidebar}>
            <i className="fas fa-bars text-white"></i>
          </button>
          <span className="navbar-brand mb-0 h1">VAMPIROS🦇</span>
        </div>

        {/*a la derecha notas*/}
        <button className="btn btn-link btn-sm" onClick={() => setShowNotes(true)}>
          <i className="bi bi-journals text-white fs-5"></i>
        </button>
      </nav>

      <NotesPanel isOpen={showNotes} onClose={() => setShowNotes(false)} />
    </>
  );
};


/*sb-topnav navbar navbar-expand navbar-dark bg-dark = barra negra 
fas fa-bars = botoncito con 3 rayitas*/

export default Header;