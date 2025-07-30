import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  onRegistroExitoso: () => void;
  modoEdicion?: boolean;
  estudianteEditar?: Estudiante;
}

function FormularioEstudiante({
  onRegistroExitoso,
  modoEdicion = false,
  estudianteEditar,
}: Props) {
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

  useEffect(() => {
    if (modoEdicion && estudianteEditar) {
      setCedula(estudianteEditar.cedula);
      setNombre(estudianteEditar.nombre);
      setApellido(estudianteEditar.apellido);
      setCorreo(estudianteEditar.correo);
      setCiudad(estudianteEditar.ciudad);
      setPais(estudianteEditar.pais);
      setDireccion(estudianteEditar.direccion);
      setTelefono(estudianteEditar.telefono);
      setCarrera(estudianteEditar.carrera);
      setNivel(estudianteEditar.nivel);
    }
  }, [modoEdicion, estudianteEditar]);

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
  };

  const validarCampos = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!cedula) {
      nuevosErrores.cedula = "La cédula es obligatoria";
    } else if (!/^[0-9]{10}$/.test(cedula)) {
      nuevosErrores.cedula = "La cédula debe tener exactamente 10 dígitos";
    }

    if (!telefono) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9]{10}$/.test(telefono)) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 10 dígitos";
    }

    if (!nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!apellido) nuevosErrores.apellido = "El apellido es obligatorio";
    if (!nivel || nivel <= 0) nuevosErrores.nivel = "Nivel inválido";

    return nuevosErrores;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validacion = validarCampos();
    setErrores(validacion);
    if (Object.keys(validacion).length > 0) return;

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

      if (modoEdicion) {
        await axios.put(
          `http://localhost:3001/api/estudiantes/${cedula}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Estudiante actualizado correctamente");
      } else {
        await axios.post("http://localhost:3001/registro", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Estudiante ha sido agregado");
      }

      limpiarCampos();
      onRegistroExitoso();
    } catch (error) {
      console.error("Error al registrar/editar:", error);
      alert("Ocurrió un error al guardar el estudiante");
    }
  };

  return (
    <div className="card p-3">
      <form onSubmit={handleSubmit}>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "personales" ? "active" : ""
              }`}
              onClick={() => setActiveTab("personales")}
              type="button"
            >
              Datos personales
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "academicos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("academicos")}
              type="button"
            >
              Datos académicos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "ubicacion" ? "active" : ""
              }`}
              onClick={() => setActiveTab("ubicacion")}
              type="button"
            >
              Ubicación
            </button>
          </li>
        </ul>

        {activeTab === "personales" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Foto</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Cédula</label>
              <input
                className="form-control"
                value={cedula}
                disabled={modoEdicion}
                onChange={(e) => setCedula(e.target.value)}
              />
              {errores.cedula && (
                <div className="text-danger small">{errores.cedula}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombres</label>
              <input
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && (
                <div className="text-danger small">{errores.nombre}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellidos</label>
              <input
                className="form-control"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              {errores.apellido && (
                <div className="text-danger small">{errores.apellido}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
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
                className="form-select"
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
                className="form-control"
                value={nivel}
                onChange={(e) => setNivel(Number(e.target.value))}
              />
              {errores.nivel && (
                <div className="text-danger small">{errores.nivel}</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "ubicacion" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">País</label>
              <input
                className="form-control"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Ciudad</label>
              <input
                className="form-control"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Dirección</label>
              <input
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {errores.telefono && (
                <div className="text-danger small">{errores.telefono}</div>
              )}
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {modoEdicion ? "Actualizar" : "Agregar Registro"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={limpiarCampos}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioEstudiante;
