import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Tarea {
  id: number;
  texto: string;
  prioridad: string;
  estado: "completo" | "incompleto";
}

const Recordatorios = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [prioridad, setPrioridad] = useState("media");

  const agregarTarea = () => {
    const nueva: Tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      prioridad,
      estado: "incompleto",
    };
    setTareas([...tareas, nueva]);
    setNuevaTarea("");
    setPrioridad("media");
    setMostrarModal(false);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const cambiarEstado = (id: number) => {
    setTareas(tareas.map((t) =>
      t.id === id ? { ...t, estado: t.estado === "completo" ? "incompleto" : "completo" } : t
    ));
  };

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Recordatorios</h5>
        <Button variant="success" size="sm" onClick={() => setMostrarModal(true)}
            title={"Agregar Recordatorio"}
            >
            <i className="bi bi-plus-square"></i>
            </Button>
      </div>
      <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {tareas.length === 0 ? (
          <p className="text-muted">Sin tareas pendientes.</p>
        ) : (
          tareas.map((tarea) => (
            <div
              key={tarea.id}
              className={`d-flex justify-content-between align-items-center mb-2 border rounded p-2 ${
                tarea.estado === "completo" ? "bg-light text-muted text-decoration-line-through" : ""
              }`}
            >
              <div>
                <strong>{tarea.texto}</strong> <span className="badge bg-secondary">{tarea.prioridad}</span>
              </div>
              <div>
                <Button
                    variant={tarea.estado === "completo" ? "warning" : "primary"}
                    size="sm"
                    onClick={() => cambiarEstado(tarea.id)}
                    title={tarea.estado === "completo" ? "Marcar como incompleto" : "Marcar como hecho"}
                >
                    <i className={tarea.estado === "completo" ? "bi bi-arrow-left-square" : "bi bi-check-square"}></i>
               </Button>{" "}
               <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarTarea(tarea.id)}
                    title="Eliminar tarea"
               >
                    <i className="bi bi-x-square"></i>
               </Button>
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
                                onChange={(e) => setPrioridad(e.target.value)}
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
           <Button variant="primary" onClick={agregarTarea} disabled={!nuevaTarea.trim()}>Agregar</Button>
       </Modal.Footer>
    </Modal>
    </div>
  );
};

export default Recordatorios;
