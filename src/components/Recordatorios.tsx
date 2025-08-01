import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { motion } from "framer-motion";


interface Tarea {
  id: number;
  texto: string;
  prioridad: "alta" | "media" | "baja";
  estado: "pendiente" | "completo";
}

interface RecordatoriosProps {
  recordatorios: Tarea[];
  setRecordatorios: React.Dispatch<React.SetStateAction<Tarea[]>>;
}

  const Recordatorios: React.FC<RecordatoriosProps> = ({ recordatorios, setRecordatorios }) => {
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media");
  const [mostrarModal, setMostrarModal] = useState(false);

//localStorage - almacenamiento local del navegador
 useEffect(() => {
  const tareasGuardadas = localStorage.getItem("recordatorios");
  try {
    const tareasParseadas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    console.log("Tareas cargadas:", tareasParseadas);
    if (Array.isArray(tareasParseadas)) {
      setRecordatorios(tareasParseadas);
    }
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
}, []);


  const agregarTarea = () => {
    const nueva: Tarea = {
    id: Date.now(),
    texto: nuevaTarea,
    prioridad,
    estado: "pendiente",
    };
    setRecordatorios([...recordatorios, nueva]);
    setNuevaTarea("");
    setMostrarModal(false);
  };
  const eliminarTarea = (id: number) => {
    setRecordatorios(recordatorios.filter((t) => t.id !== id));
  };

  const cambiarEstado = (id: number) => {
    setRecordatorios(recordatorios.map((t) =>
      t.id === id 
    ? { 
      ...t, estado: t.estado === "pendiente" ? "completo" : "pendiente"} : t
    ));
  };

  return (
  <div className="recordatorios-contenedor">
    <motion.div
      style={{ minHeight: "400px", width: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="recordatorios-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="titulo-recordatorios">Recordatorios</h5>
          <button
            type="button"
            className="btn-morado"
            onClick={() => setMostrarModal(true)}
            title="Agregar Recordatorio"
          >
            <i className="bi bi-plus-square me-1"></i> Agregar
          </button>
      </div>

      <div className="recordatorios-body">
        {recordatorios.length === 0 ? (
          <p className="text-muted">Sin recordatorios pendientes.</p>
        ) : (
          recordatorios.map((tarea) => (
            <div
              key={tarea.id}
              className={`tarea-item ${tarea.estado === "completo" ? "text-muted text-decoration-line-through" : ""}`}
            >
            <div>
                <strong>{tarea.texto}</strong> 
                <span className={`badge rounded-pill prioridad-${tarea.prioridad}`}>
                  {tarea.prioridad}
                </span>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => cambiarEstado(tarea.id)}
                  title={
                    tarea.estado === "completo"
                    ? "Marcar como incompleto"
                    : "Marcar como hecho"
                  }
                >
                  <i
                    className={
                    tarea.estado === "completo"
                    ? "bi bi-arrow-left-square"
                    : "bi bi-check-square"
                   }
                ></i>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarTarea(tarea.id)}
                  title="Eliminar tarea"
                >
                 <i className="bi bi-x-square"></i>
                </button>
             </div>
           </div>
          ))
        )}
      </div>

      {/* Modal */}
        <Modal
          show={mostrarModal}
          onHide={() => setMostrarModal(false)}
          className="modal-margen-superior"
        >
          <Modal.Header closeButton>
             <Modal.Title>Agregar Recordatorio</Modal.Title>
          </Modal.Header>
             <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control
                    type="text"
                    value={nuevaTarea}
                    onChange={(e) => setNuevaTarea(e.target.value)}
                    placeholder="Escribe una tarea"
                  />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Prioridad</Form.Label>
                        <Form.Select
                          value={prioridad}
                          onChange={(e) => setPrioridad(e.target.value as "alta" | "media" | "baja")}
                        >
                         <option value="alta">Alta</option>
                         <option value="media">Media</option>
                         <option value="baja">Baja</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
              <Button className="btn-morado" onClick={agregarTarea} disabled={!nuevaTarea.trim()}>Agregar</Button>
            </Modal.Footer>
        </Modal>
       </div>
     </motion.div>
 </div>
  );
};

export default Recordatorios;
