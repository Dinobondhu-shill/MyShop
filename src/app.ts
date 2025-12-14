import express from 'express'

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MyShop!')
})  


export default app