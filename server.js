import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import ConnectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import incomeRoutes from './routes/income.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import { fileURLToPath } from 'url';
const app = express()
dotenv.config()

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;
ConnectDB()
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})