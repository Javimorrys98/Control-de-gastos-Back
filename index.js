import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { db } from './config/db.js';
import expenseRoutes from './routes/expenseRoutes.js';

// Configura las variables de entorno
dotenv.config();

// Configura la app
const app = express();

// Leer datos via body
app.use(express.json());

//Conectar a la bd
db();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

if (process.argv[2] === '--postman') {
    whitelist.push(undefined);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            //Permite la conexión
            callback(null, true);
        } else {
            //Bloquea la conexión
            callback(new Error(`Error de CORS: ${origin}`));
        }
    }
};

app.use(cors(corsOptions));

//Definir una ruta
app.get("/", (req, res) => {
    const htmlResponse = `
        <html>
            <head>
                <title>Control de gastos - API</title>
            </head>
            <body>
                <h1>Soy un proyecto Back end en vercel</h1>
            </body>
        </html>
    `;
    res.send(htmlResponse);
});
app.use('/api/expenses', expenseRoutes);
// app.use('/api/services', servicesRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// Definir un puerto
const port = process.env.PORT || 4000;

// Arrancar la app
app.listen(port, () => {
    console.log(colors.blue('Escuchando en el puerto:', colors.bold(port)));
});