require('dotenv').config()

const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
const MONGODB_URI = `mongodb://bloglist:${PASSWORD}@localhost:27017/bloglist`

module.exports = {
    PASSWORD,
    PORT,
    MONGODB_URI
}