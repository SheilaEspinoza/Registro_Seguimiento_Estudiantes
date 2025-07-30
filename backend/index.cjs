/*Para comprobar conexion, en termial ejecutar
PS C:\laragon\www\react-registro-estudiantes> cd backend
PS C:\laragon\www\react-registro-estudiantes\backend> node index.cjs

debe aparecer mensaje: Servidor corriendo en http://localhost:3001
Base de datos conectada correctamente
 */

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registros",
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Base de datos conectada correctamente");
  }
});

// Ruta para registrar estudiante
app.post("/registro", upload.single("foto"), (req, res) => {
  const { cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono } = req.body;
  const foto = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO estudiantes 
    (cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al insertar en la base:", err);
      return res.status(500).send("Error del servidor");
    } else {
      res.send("Estudiante registrado correctamente");
    }
  });
});

// Obtener todos los estudiantes
app.get("/api/estudiantes", (req, res) => {
  db.query("SELECT * FROM estudiantes", (err, results) => {
    if (err) {
      console.error("Error al obtener estudiantes:", err);
      return res.status(500).json({ mensaje: "Error al obtener estudiantes" });
    }
    res.json(results);
  });
});

// Eliminar estudiante por cédula
app.delete("/api/estudiantes/:cedula", (req, res) => {
  const { cedula } = req.params;
  db.query("DELETE FROM estudiantes WHERE cedula = ?", [cedula], (err, result) => {
    if (err) {
      console.error("Error al eliminar estudiante:", err);
      return res.status(500).json({ error: "Error al eliminar estudiante" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.status(200).json({ mensaje: "Estudiante eliminado correctamente" });
  });
});

// Actualizar estudiante
app.put("/api/estudiantes/:cedula", upload.single("foto"), (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono } = req.body;
  const foto = req.file ? req.file.filename : null;

  let sql = `
    UPDATE estudiantes 
    SET nombre = ?, apellido = ?, correo = ?, carrera = ?, nivel = ?, 
        pais = ?, ciudad = ?, direccion = ?, telefono = ?
  `;
  const values = [nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono];

  if (foto) {
    sql += `, foto = ?`;
    values.push(foto);
  }

  sql += ` WHERE cedula = ?`;
  values.push(cedula);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar estudiante:", err);
      return res.status(500).send("Error del servidor");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Estudiante no encontrado");
    }
    res.send("Estudiante actualizado correctamente");
  });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
