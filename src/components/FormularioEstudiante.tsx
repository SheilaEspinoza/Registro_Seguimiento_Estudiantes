import React, { useState, useEffect } from "react";
import axios from "axios";

function FormularioEstudiante({ onRegistroExitoso }: { onRegistroExitoso: () => void }) {
  const [activeTab, setActiveTab] = useState("personales");

  const [foto, setFoto] = useState<File | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");

  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [carrera, setCarrera] = useState("");
  const [nivel, setNivel] = useState(1);

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  // Estado para mostrar modal de error general
  const [mostrarModalError, setMostrarModalError] = useState(false);

  const limpiarCampos = () => {
    setNombre("");
    setApellido("");
    setCedula("");
    setCorreo("");
    setFoto(null);
    setCiudad("");
    setPais("");
    setDireccion("");
    setTelefono("");
    setCarrera("");
    setNivel(1);
    setErrores({});
    setMostrarModalError(false);
  };

  const validarCampos = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!cedula) {
      nuevosErrores.cedula = "La cédula es obligatoria";
    } else if (!/^\d+$/.test(cedula)) {
      nuevosErrores.cedula = "La cédula debe contener solo números";
    }

    if (!telefono) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(telefono)) {
      nuevosErrores.telefono = "El teléfono debe contener solo números";
    }

    if (!nivel || nivel <= 0) {
      nuevosErrores.nivel = "El nivel debe ser un número positivo";
    }

    if (!nombre) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!apellido) {
      nuevosErrores.apellido = "El apellido es obligatorio";
    }

    return nuevosErrores;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacion = validarCampos();
    setErrores(validacion);

    if (Object.keys(validacion).length > 0) {
      // Mostrar modal general de error
      setMostrarModalError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cedula", cedula);
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("correo", correo);
      formData.append("carrera", carrera);
      formData.append("nivel", nivel.toString());
      formData.append("pais", pais);
      formData.append("ciudad", ciudad);
      formData.append("direccion", direccion);
      formData.append("telefono", telefono);
      if (foto) formData.append("foto", foto);

      await axios.post("http://localhost:3001/registro", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onRegistroExitoso();
      alert("Estudiante ha sido agregado");
      limpiarCampos();

      const modalElement = document.getElementById("modalNuevoRegistro");
      if (modalElement) {
        const modal = window.bootstrap?.Modal.getInstance(modalElement);
        modal?.hide();
      }
    } catch (error) {
      console.error("Error al realizar registro en Base de datos:", error);
      alert("Error al registrar estudiante");
    }
  };

  // Opcional: ocultar modal automáticamente después de 3 segundos
  /*useEffect(() => {
    if (mostrarModalError) {
      const timer = setTimeout(() => {
        setMostrarModalError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mostrarModalError]);
*/
  return (
    <>
      <div className="card p-4 mb-4" style={{ minHeight: "400px" }}>
        <h5 className="card-title">Registrar estudiante</h5>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "personales" ? "active" : ""}`}
              onClick={() => setActiveTab("personales")}
            >
              Datos personales
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "academicos" ? "active" : ""}`}
              onClick={() => setActiveTab("academicos")}
            >
              Datos académicos
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "ubicacion" ? "active" : ""}`}
              onClick={() => setActiveTab("ubicacion")}
            >
              Datos de ubicación
            </button>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          {activeTab === "personales" && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-sm"
                  onChange={(e) => setFoto(e.target.files?.[0] || null)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Cédula</label>
                <input
                  className="form-control form-control-sm"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                {errores.cedula && <div className="text-danger small mt-1">{errores.cedula}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombres</label>
                <input
                  className="form-control form-control-sm"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errores.nombre && <div className="text-danger small mt-1">{errores.nombre}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Apellidos</label>
                <input
                  className="form-control form-control-sm"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                {errores.apellido && <div className="text-danger small mt-1">{errores.apellido}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Correo</label>
                <input
                  className="form-control form-control-sm"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "academicos" && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Carrera</label>
                <select
                  className="form-select form-select-sm"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                >
                  <option value="">Seleccione una carrera</option>
                  <option value="Computación">Computación</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Nivel</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={nivel}
                  onChange={(e) => setNivel(Number(e.target.value))}
                />
                {errores.nivel && <div className="text-danger small mt-1">{errores.nivel}</div>}
              </div>
            </div>
          )}

          {activeTab === "ubicacion" && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">País</label>
                <input
                  className="form-control form-control-sm"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  className="form-control form-control-sm"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Dirección</label>
                <input
                  className="form-control form-control-sm"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  className="form-control form-control-sm"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                {errores.telefono && <div className="text-danger small mt-1">{errores.telefono}</div>}
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  Agregar Registro
                </button>


                <button type="button" className="btn btn-secondary" onClick={limpiarCampos}>
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Modal para error general */}
      {mostrarModalError && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Error en el formulario</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={() => setMostrarModalError(false)}
                />
              </div>
              <div className="modal-body">
                <p>Hay errores en el formulario, por favor corrígelos antes de continuar.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setMostrarModalError(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormularioEstudiante;
