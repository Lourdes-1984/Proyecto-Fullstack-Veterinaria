import express from "express"

const app = express()

app.use('/', (req,res) => {
    res.send('Hola Mundo Cruel')
})

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})