require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
//aplicando um middleware
app.use(express.json())

const eventos = []

//aqui recebemos todos os eventos
//e repassamos para todos os mss
app.post('/eventos', async (req, res) => {
  //aqui pegamos o evento
  const evento = req.body
  eventos.push(evento)
  console.log(evento)
  if(evento.type == "LembreteClassificado"){
    try{
      await axios.post('http://localhost:4000/eventos', evento) // mss lembretes
    }
    catch(e){}
  }

  if(evento.type == "ObservacaoClassificada"){
    try{
      await axios.post('http://localhost:5000/eventos', evento) // mss observações
    }
    catch(e){}
  }

  if(evento.type != "ObservacaoClassificada" && evento.type != "LembreteClassificado"){
    try{
      await axios.post('http://localhost:6000/eventos', evento) // mss consulta
    }
    catch(e){}
  }
  
  if(evento.type == "ObservacaoCriada" || evento.type == "LembreteCriado"){
    try{
      await axios.post('http://localhost:7000/eventos', evento) // mss classificação
    }
    catch(e){}
  }

  res.status(200).end()
})

app.get('/eventos', (req, res) => {
  res.status(200).json(eventos)
})

app.listen(
  process.env.PORT, 
  () => console.log(`Barramento: ${process.env.PORT}`)
)