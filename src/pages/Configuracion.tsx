import { useState, ChangeEvent, useEffect } from "react";
import marcoImg from "./marco.webp"; // ruta relativa válida
import "../App.css";

const Configuracion = () => {
  const [nombre, setNombre] = useState("Usuario");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [imagenUsuario, setImagenUsuario] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (modoOscuro) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }, [modoOscuro]);

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
    <div className="configuracion-pagina">
      <h2>Configuración</h2>
      <div className="configuracion-container">
        <div
          className="configuracion-marco"
          style={{ backgroundImage: `url(${marcoImg})` }}
        >
          {imagenUsuario && (
            <img src={imagenUsuario} alt="Usuario" className="configuracion-imagen" />
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
  );
};

export default Configuracion;
