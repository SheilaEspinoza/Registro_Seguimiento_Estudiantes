/*Para ejecutar - en terminal
PS C:\laragon\www\react-registro-estudiantes> cd backend
PS C:\laragon\www\react-registro-estudiantes\backend> node index.cjs

debe aparecer mensaje: Servidor corriendo en http://localhost:3001
Base de datos conectada correctamente
 */
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/create",(req,res)=>{
    const id = req.body.id;
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const carrera = req.body.carrera;
    const nivel = req.body.nivel;
    const pais = req.body.pais;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const foto = req.body.foto;
    const creado_el = req.body.creado_el;

    db.query("INSERT INTO estudiantes(id, cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto, creado_el) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, cedula, nombre, apellido, correo, carrera, nivel, pais, ciudad, direccion, telefono, foto, creado_el],
      (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Registro agregado exitosamente");
        }
      }
    );

  });

// Ruta de prueba
app.get("/api/estudiantes", (req, res) => {
  db.query("SELECT * FROM estudiantes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// para iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
