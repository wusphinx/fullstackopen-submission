const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.password.length < 3) {
        return response.status(400).send({ error: "password min length is 3!" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    user.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter