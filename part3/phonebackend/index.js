const express = require('express')
const morgan = require('morgan')
const app = express()

// 自定义日志输出字段
morgan.token('body', req => req.body === null ? JSON.stringify(req.body) : '')

// 自动解析数据
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req)
    ].join(' ')
}))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    }
]

app.get('/info', (req, res) => {
    res.send('Phonebook has info ' + persons.length + " pepole <br />" + Date("UTC").toString())
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    console.log(person)

    if (!person.name) {
        return res.status(401).send({ error: 'name missing' })
    }
    if (!person.number) {
        return res.status(401).send({ error: 'number missing' })
    }

    if (persons.find(p => p.name === person.name)) {
        return res.status(401).send({ error: 'name must be unique' })
    }

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})