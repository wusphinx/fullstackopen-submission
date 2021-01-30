const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    await Blog.find({ user: request.headers['UserID'] }).populate('user').then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', async (request, response) => {
    await Blog.find({ user: request.headers['UserID'], _id: request.params.id }).populate('user').then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(request.headers.UserID)

    const blog = new Blog({
        "author": body.author,
        "title": body.title,
        "likes": body.likes,
        "url": body.url,
    })

    blog.user = user._id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).end()
    }

    console.log("user is", blog.user, request.headers["UserID"])
    if (blog.user != request.headers["UserID"]) {
        return response.status(403).json({ error: "forbidden" })
    }

    blog.remove()
        .then(res => {
            response.status(201).json(res)
        })
})

blogsRouter.put('/:id/like', (request, response, next) => {
    Blog.findOneAndUpdate({ _id: request.params.id, user: request.headers["UserID"] }, { $inc: { likes: 1 } })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter