const blog = require("../models/blog")

const dummy = (blogs) => {
    return blogs.length
}

const totalLikes = blogs => blogs.reduce((acc, cur) => acc + cur.likes, 0)

const favoriteBlog = blogs => {
    const m = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        m = m.likes > blogs[i].likes ? m : blogs[i]
    }

    return m
}

const mostBlogs = blogs => {
    // TODO
}


const idExist = blog => blog.id

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    idExist
}


