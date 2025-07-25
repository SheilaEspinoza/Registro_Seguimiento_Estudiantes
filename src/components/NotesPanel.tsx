import { useState, useEffect } from "react";

const NotesPanel = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");

  // Cargar nota desde localStorage si existe
  useEffect(() => {
    const savedNote = localStorage.getItem("adminNote");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  // Guardar en localStorage cuando la nota cambia
  useEffect(() => {
    localStorage.setItem("adminNote", note);
  }, [note]);

  if (!isOpen) return null;

  return (
    <div className="notes-panel">
      <h5>Notas rápidas</h5>
      <textarea
        className="form-control"
        style={{ height: "80%", resize: "none" }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Escribe tus notas"
      ></textarea>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-sm btn-danger" onClick={() => setNote("")}>
          Borrar
        </button>
        <button className="btn btn-sm btn-secondary ms-2" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;
