import express from "express"
const app = express()
app.use(express.json())

//simjulacao do db
export let products = [];

//funcao para resetar o db
export const resetProducts = () =>{
    products = []
}

app.get("/api/ping", (req, res) =>{
    return res.status(200).json({ pong:true})
})

export default app