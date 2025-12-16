import express from 'express'
import { authRoutes } from './modules/auth/auth.routes';
import initDB from './config/db';

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MyShop!')
})  

initDB();


app.use('/api/auth', authRoutes)


export default app