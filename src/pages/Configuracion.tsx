import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import marcoImg from "./marco.webp"; 
import "../App.css";
import ConfRedes from "../components/ConfRedes";
import SplashCursor from "../Animations/SplashCursor/SplashCursor";

interface ConfiguracionProps {
  setUser: (user: string | null) => void;
}

const Configuracion: React.FC<ConfiguracionProps> = ({ setUser }) => {
  /*CONSTANTES */
  //nombre de usuario 
  const [nombre, setNombre] = useState(() => {
  return localStorage.getItem("nombreUsuario") || "Usuario";
});
  //modo oscuro
  const [modoOscuro, setModoOscuro] = useState(() => {
  const stored = localStorage.getItem("modoOscuro");
  return stored === "true";
});

//imagen
  const [imagenUsuario, setImagenUsuario] = useState<string | null>(() => {
  return localStorage.getItem("imagenUsuario") || null;
});

//boton para cerras sesion
const handleCerrarSesion = () => {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("imagenUsuario");
  localStorage.removeItem("modoOscuro");
  setUser(null);
};

/*UseEffect */
//mantener nombre usuario
useEffect(() => {
  localStorage.setItem("nombreUsuario", nombre);
}, [nombre]);

//mantener modo oscuro
 useEffect(() => {
  const root = document.documentElement;
  if (modoOscuro) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }
  localStorage.setItem("modoOscuro", modoOscuro.toString());
}, [modoOscuro]);

//mantener img user
useEffect(() => {
  if (imagenUsuario) {
    localStorage.setItem("imagenUsuario", imagenUsuario);
  }
}, [imagenUsuario]);


  const handleNombreChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const handleModoOscuroChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModoOscuro(e.target.checked);
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setImagenUsuario(reader.result.toString());
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="expandir-components">
                  <SplashCursor/> 
        <div className="configuracion-pagina">
          <h3 style={{ alignItems: "center" }}>Configuración</h3>
          <div className="configuracion-container">
            <div
              className="configuracion-marco"
              style={{ backgroundImage: `url(${marcoImg})` }}
            >
              {imagenUsuario && (
                <img
                  src={imagenUsuario}
                  alt="Usuario"
                  className="configuracion-imagen"
                />
              )}
            </div>

            <div className="configuracion-opciones">
              <div className="configuracion-nombre">
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={handleNombreChange}
                  placeholder="Ingrese su nombre"
                />
              </div>

              <div className="configuracion-modo-oscuro">
                <input
                  type="checkbox"
                  id="modoOscuro"
                  checked={modoOscuro}
                  onChange={handleModoOscuroChange}
                />
                <label htmlFor="modoOscuro">Modo Oscuro</label>
              </div>

              <div>
                <label htmlFor="cambiarFoto" className="btn-cambiar-foto">
                  Cambiar Foto
                </label>
                <input
                  type="file"
                  id="cambiarFoto"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ConfRedes></ConfRedes>
        </div>
        <div className="cerrar-sesion-container">
  <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
    <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
  </button>
</div>
      </div>
    </>
  );
};

export default Configuracion;
