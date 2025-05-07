const express = require("express");
const mysql = require("mysql2/promise"); // Usar mysql2/promise
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:4000", // Permite peticiones desde el frontend React
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeceras permitidas
}));

// Middleware para parsear JSON
app.use(express.json());

let db;

// Usamos async para poder trabajar con await en la conexión
async function conectarBD(intentos = 5) {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("Conectado a MySQL");
        iniciarServidor();
    } catch (err) {
        console.error("Error al conectar con la base de datos:", err.message);
        if (intentos > 0) {
            console.log(
                `Reintentando en 3 segundos... (${intentos} intentos restantes)`,
            );
            setTimeout(() => conectarBD(intentos - 1), 3000);
        } else {
            console.error("No se pudo conectar a la base de datos. Saliendo.");
            process.exit(1);
        }
    }
}

function iniciarServidor() {
    // Registro de cliente
    app.post("/api/register", async (req, res) => {
        const { nombre, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            const [results] = await db.execute(
                "INSERT INTO clientes (nombre, email, password) VALUES (?, ?, ?)",
                [nombre, email, hashedPassword],
            );
            res.json({ message: "Cliente registrado exitosamente" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Inicio de sesión
    app.post("/api/login", async (req, res) => {
        const { email, password } = req.body;

        try {
            const [results] = await db.execute(
                "SELECT * FROM clientes WHERE email = ?",
                [email],
            );

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Usuario no encontrado",
                });
            }

            const client = results[0];

            bcrypt.compare(password, client.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (!isMatch) {
                    return res.status(401).json({
                        message: "Contraseña incorrecta",
                    });
                }

                res.json({
                    message: "Inicio de sesión exitoso",
                    clients: results,
                });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Listar clientes
    app.get("/api/clientes", async (req, res) => {
        try {
            const [results] = await db.execute("SELECT * FROM clientes");
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Listar productos
    app.get("/api/productos", async (req, res) => {
        try {
            const [results] = await db.execute("SELECT * FROM productos");

            const productos = results.map((product) => ({
                ...product,
                precio: parseFloat(product.precio) || 0, // Asegúrate de que 'precio' sea un número
            }));

            res.json(productos);
        } catch (err) {
            console.error("Error al obtener productos:", err.message);
            res.status(500).json({ error: err.message });
        }
    });

    // Iniciar el servidor Express
    app.listen(port, () => {
        console.log(`Backend corriendo en http://localhost:${port}`);
    });
}

// Iniciar intento de conexión
conectarBD();
