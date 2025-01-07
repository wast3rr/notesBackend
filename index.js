const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const url = process.env.MONGODB_URI

app.get('/',  (request, response) => {

})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    
    if (note) {
        response.json(note)
    } else {
        response.statusMessage = 'Note id not found'
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})