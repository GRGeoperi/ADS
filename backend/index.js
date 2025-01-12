const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Configuración del middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Ruta para login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consulta para obtener el usuario por email
        const result = await pool.query(
            "SELECT passwordhash FROM usuario WHERE email = $1", // Solo seleccionamos la contraseña hash almacenada
            [email]
        );

        if (result.rows.length > 0) {
            const storedHash = result.rows[0].passwordhash; // Extraemos el hash de la base de datos

            // Comparamos la contraseña ingresada con el hash almacenado
            const isMatch = await bcrypt.compare(password, storedHash);

            if (isMatch) {
                // Contraseña correcta, iniciamos sesión
                res.json({ success: true, message: "Inicio de sesión exitoso" });
            } else {
                // Contraseña incorrecta
                res.status(401).json({ success: false, message: "Contraseña incorrecta" });
            }
        } else {
            // Usuario no encontrado
            res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error en el servidor:", error.message);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

app.post("/api/register", async (req, res) => {
    const { email, password, nombre, apellidoPaterno, apellidoMaterno, alias } = req.body;

    try {
        // Verificar si el usuario ya existe por email
        const existenciaEmail = await pool.query(
            "SELECT * FROM usuario WHERE email = $1",
            [email]
        );

        if (existenciaEmail.rows.length > 0) {
            // El usuario ya existe
            return res.status(400).json({ success: false, message: "El usuario ya existe" });
        }

        // Verificar si el alias ya está en uso
        const existenciaAlias = await pool.query(
            "SELECT * FROM usuario WHERE alias = $1",
            [alias]
        );

        if (existenciaAlias.rows.length > 0) {
            // El alias ya está en uso
            return res.status(400).json({ success: false, message: "El alias ya está en uso" });
        }

        // Hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario
        await pool.query(
            "INSERT INTO usuario (email, passwordHash, nombre, apellidoPaterno, apellidoMaterno, alias) VALUES ($1, $2, $3, $4, $5, $6)",
            [email, passwordHash, nombre, apellidoPaterno, apellidoMaterno, alias]
        );

        res.json({ success: true, message: "Usuario registrado, pendiente su asignación de rol por el Administrador." });
    } catch (error) {
        console.error("Error en el servidor:", error.message);
        res.status(500).json({ success: false, message: "Error del servidor." });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
