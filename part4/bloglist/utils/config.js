require('dotenv').config()

const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
const MONGODB_URI = `mongodb://bloglist:${PASSWORD}@localhost:27017/bloglist`
const SECRET = process.env.SECRET
module.exports = {
    PASSWORD,
    PORT,
    MONGODB_URI,
    SECRET
}