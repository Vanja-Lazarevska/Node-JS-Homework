import express from 'express'
import blogRouter from './routes/blog.router.js'

const server = express()

server.use(express.json())
server.use((req, res, next) => { 
    const date = new Date().toLocaleString()
    console.log(`We are at middleware, request made at ${date}`)
    next()
})

server.use('/blog',blogRouter)

server.get('*', (req, res) => {
    res.redirect('/')
})
server.delete('*', (req, res) => {
    res.redirect('/')
})
server.post('*', (req, res) => {
    res.redirect('/')
})
server.patch('*', (req, res) => {
    res.redirect('/')
})
server.listen(3000, () => {
    console.log('Server is listening on port: 3000')
})

// Blog posts App
// Create a simple blog application that allows users to create, read, update, and delete blog posts.
// Note:
// The blog object should have the following properties:
// id (string), title (string), body(string), author(string), date(string), tags (array of strings)
// Requirements:
// The user should be able to view a list of all blog posts.
// The user should be able to create a new blog post.
// The user should be able to edit an existing blog post. (only the properties title, body and tags are editable)
// The user should be able to delete a blog post.
// The application should use the MVC pattern.
// BONUS:

// Implement a route that will filter out, and return only those blogs which tags property includes the given keywords provided through query params.