import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function ConfRedes() {
  return (
    <>
      <div className="card-Redes">
        <div className="tarjeta Redes">
          <h3>Redes Sociales</h3>
          <div className="Redes-buttons">
            <button className="boton-redes">
              <a
                href="https://www.facebook.com/UCSGye"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="icono-redes" />
              </a>
            </button>
            <button className="boton-redes">
              <a
                href="https://www.instagram.com/ucsgye/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="icono-redes" />
              </a>
            </button>
            <button className="boton-redes">
              <a
                href="https://www.linkedin.com/school/1613218"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="icono-redes" />
              </a>
            </button>
          </div>
        </div>
        <div className="tarjeta Accesos">
          <h3>Accesos Directos</h3>
          <div className="accesos-botones">
            <a
              href="https://www46.ucsg.edu.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="boton-acceso"
            >
              Servicios en línea
            </a>
            <a
              href="https://www211.ucsg.edu.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="boton-acceso"
            >
              Campus Virtual
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfRedes;
