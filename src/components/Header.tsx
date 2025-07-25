function Header() {
  const toggleSidebar = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
  };
  /*Cada vez que hago clic en el boton hamburguesa, si el <body> ya tiene la clase sb-sidenav-toggled, 
  se la quita, caso contrario agg. */

 return (
    <nav className="navbar navbar-dark bg-dark fixed-top shadow" style={{ zIndex: 9999 }}>
      {/* Menu(fijo) */}
      <span className="navbar-brand ms-3">Nombre App</span>

      {/* Botón hamburguesa */}
      <button
        className="btn btn-link btn-sm toggle-btn"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars text-white"></i>
      </button>
    </nav>
  );
}

/*sb-topnav navbar navbar-expand navbar-dark bg-dark = barra negra 
fas fa-bars = botoncito con 3 rayitas*/

export default Header;