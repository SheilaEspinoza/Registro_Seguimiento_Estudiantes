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

app.use(cors());
app.use(express.json());

app.use("/uploads", require("express").static("uploads"));
const multer = require("multer"); //npm install multer
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Conexion a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",    
  database: "registros"
});

// verifico conexion
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Base de datos conectada correctamente");
  }
});

app.post("/registro", upload.single("foto"), (req, res) => {
     const { cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono } = req.body;
     const foto = req.file ? `/uploads/${req.file.filename}` : null;

     const sql = `INSERT INTO estudiantes 
                (cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
     const values = [cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto];
     console.log("BODY:", req.body);
     console.log("FILE:", req.file);

    db.query(sql, values, (err, result) => {
        if(err){
            console.error("Error al insertar en la base:", err);
            return res.status(500).send("Error del servidor");
        }else{
            res.send("Estudiante registrado correctamente");
        }
    });
  });

  app.get('/api/estudiantes', async (req, res) => {
  try {
      db.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) {
         console.error("Error al obtener estudiantes:", err);
         res.status(500).json({ mensaje: "Error al obtener estudiantes" });
        } else {
          res.json(results);
         }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener estudiantes" });
  }
});

//Para eliminar registro
app.delete("/estudiantes/:cedula", async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query("DELETE FROM estudiantes WHERE cedula = $1", [cedula]);

    if (result.rowCount > 0) {
      res.status(200).json({ mensaje: "Estudiante eliminado correctamente" });
    } else {
      res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ error: "Error al eliminar estudiante" });
  }
});


// para iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});