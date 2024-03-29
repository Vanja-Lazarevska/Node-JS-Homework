import express from 'express'
import BlogController from '../controller/blog.controller.js'
import fileService from '../file_service_modules/file-service.js'
import authSession from '../session/session.create.js'
import jwt from 'jsonwebtoken'

const blogController = new BlogController()

const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {

    res.send('<h1>BLOG APP</h1>')
})


blogRouter.get('/all_posts', async (req, res) => {
    const allBlogs = await blogController.listAllBlogs()
    res.send(allBlogs)
})


// stateful - session based authentication and authorization
blogRouter.post('/create_blog',authSession, async (req, res) => {
    const body = req.body
    const session = req.session
    if (!body.title || !body.body || !body.author || !body.tags || !body.id) {
        res.status(400).send('Invalid post method')

    } else if (body.title instanceof String || body.author instanceof String || body.body instanceof String) {
        res.status(400).send('Please enter a string for title, body and author')

    }
    else if (!body.tags instanceof Array && body.tags.forEach(tag => typeof tag !== 'string')) {
        console.log(body.tags)
        res.status(400).send('Enter an array of strings as tags')
    }

    if(session.user !== undefined && session.user.isLoggedIn === true){
        console.log(session)
        await blogController.creatingNewBlogs(body.id, body.title, body.body, body.author, body.tags)
        res.status(201).send({message:'New blog created'})
    } else {
        res.status(404).send('You need to be logged in')
        console.log('Something is not right')
    }

})


// stateful - cookie based authentication and authorization
// blogRouter.post('/create_blog', async (req, res) => {
//     const body = req.body
//     const cookies = req.cookies
//     console.log(cookies)

//     if (!body.title || !body.body || !body.author || !body.tags || !body.id) {
//         res.status(400).send('Invalid post method')

//     } else if (body.title instanceof String || body.author instanceof String || body.body instanceof String) {
//         res.status(400).send('Please enter a string for title, body and author')

//     }
//     else if (!body.tags instanceof Array && body.tags.forEach(tag => typeof tag !== 'string')) {
//         console.log(body.tags)
//         res.status(400).send('Enter an array of strings as tags')
//     }

//     if(cookies.user !== undefined && cookies.user.isLoggedIn === true){
//         await blogController.creatingNewBlogs(body.id, body.title, body.body, body.author, body.tags)
//         res.status(201).send({message:'New blog created'})
//     } 
//     else {
//         res.status(404).send('You need to be logged in')
//         console.log('Something is not right')
//     }

// })

// Stateless - token based authorization and authentication
// blogRouter.post('/create_blog', async (req, res) => {
//     const body = req.body
//     const authHeaders = req.headers['authorization']

//     if (!body.title || !body.body || !body.author || !body.tags || !body.id) {
//         res.status(400).send('Invalid post method')
//     }
//     else if (body.title instanceof String || body.author instanceof String || body.body instanceof String) {
//         res.status(400).send('Please enter a string for title, body and author')
//     }
//     else if (!body.tags instanceof Array && body.tags.forEach(tag => typeof tag !== 'string')) {
//         console.log(body.tags)
//         res.status(400).send('Enter an array of strings as tags')
//     }

//     if (authHeaders) {
//         const token = authHeaders.split(" ")[1]
//         const verifyToken = jwt.verify(token, "login_access_token")
//         if(verifyToken){
//             await blogController.creatingNewBlogs(body.id, body.title, body.body, body.author, body.tags)
//             res.status(201).send({ message: 'New blog created' })
//         }
//         else {
//         res.status(404).send('You need to be logged in')
    
//     }
// } 
// })

blogRouter.patch('/edit_blog/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const blogs = await blogController.editBlog(id, body.title, body.body, body.tags)

    if (blogs.length == 0) {
        res.status(400).send('Invalid request, you can not edit this')

    } else {
        res.send('it is changed')
        await fileService.writeFile('./db/blogs.json', JSON.stringify(blogs, null, 2))
    }

})

blogRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        await blogController.deleteBlog(id)
        res.status(200).send(`Blog with id ${id} is deleted`)
    } catch (error) {
        res.status(404).send(error)
    }

})

blogRouter.get('/sorted_blogs', async (req, res) => {

    const queryPrams = req.query
    console.log('Query params',queryPrams)
    console.log('Query tags',queryPrams.tag)
    const blog = await blogController.tagBlogs(queryPrams.tag)


    if(blog.length !== 0) {
        res.send(blog)
        console.log('Blog',blog)

    } else {
        res.status(404).send('No such property in tags array')
        console.log('Bdsadsdlog',blog)
    } 

})


export default blogRouter