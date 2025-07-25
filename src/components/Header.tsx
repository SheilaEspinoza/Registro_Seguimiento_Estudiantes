function Header() {
  const toggleSidebar = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
  };
  /*Cada vez que hago clic en el boton hamburguesa, si el <body> ya tiene la clase sb-sidenav-toggled, 
  se la quita, caso contrario agg. */

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark"> {/* Boton Hamburguesa */}
      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <a className="navbar-brand ps-3" href="/">Menú</a>
    </nav>
  );
}
/*sb-topnav navbar navbar-expand navbar-dark bg-dark = barra negra 
fas fa-bars = botoncito con 3 rayitas*/

export default Header;