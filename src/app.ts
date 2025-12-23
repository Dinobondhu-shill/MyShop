import express from 'express'
import { authRoutes } from './modules/auth/auth.routes';
import initDB from './config/db';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello, MyShop!')
})  

initDB();


app.use('/api/auth', authRoutes)


export default app