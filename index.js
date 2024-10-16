const express = require('express')
const app = express()

let phoneNumberInfos = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(phoneNumberInfos)
})

app.get('/api/info', (request, response) => {
  const requestTime = new Date().toString();

  response.send(`
    <p>Phonebook has info for ${phoneNumberInfos.length} people</p>
    <p>${requestTime}</p>
    `)
})

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id
  const info = phoneNumberInfos.find(info => info.id === id)

  if (info) {
    response.json(info)
  } else {
    response.status(404).end()
  }
})

app.delete(`/api/persons/:id`, (request, response) => {
  const id = request.params.id
  phoneNumberInfos = phoneNumberInfos.filter(info => info.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})