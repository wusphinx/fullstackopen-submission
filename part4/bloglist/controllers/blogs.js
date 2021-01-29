var _ = require('lodash/core')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response) => {
    Blog.find({ _id: request.params.id })
        .remove()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.put('/:id/like', (request, response, next) => {
    Blog.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter