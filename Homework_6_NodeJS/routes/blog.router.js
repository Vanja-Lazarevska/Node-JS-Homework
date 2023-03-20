import express from 'express'
import BlogController from '../controller/blog.controller.js'
import fileService from '../file_service_modules/file-service.js'



const blogController = new BlogController()

const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {

    res.send('<h1>BLOG APP</h1>')
})


blogRouter.get('/all_posts', async (req, res) => {

    const allBlogs = await blogController.listAllBlogs()
    res.send(allBlogs)
})


blogRouter.post('/create_blog', async (req, res) => {
    const body = req.body

    if (!body.title || !body.body || !body.author || !body.date || !body.tags || !body.id) {
        res.status(400).send('Invalid pust method')

    } else if (body.title instanceof String || body.author instanceof String || body.body instanceof String || body.date instanceof String) {
        res.status(400).send('Please enter a string for title, body, author and date')

    }
    else if (!Array.isArray(body.tags && body.tags.forEach(tag => tag instanceof String))) {
        res.status(400).send('Enter an array of strings as tags')
    }

    else {
        await blogController.creatingNewBlogs(body.id, body.title, body.body, body.author, body.date, body.tags)
        res.status(201).send('New blog created')

    }

})

blogRouter.patch('/edit_blog/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const blogs = await blogController.editBlog(id, body.title, body.body, body.tags)
      
    if (blogs.length == 0) {
        res.status(400).send('Invalid request, you can not edit this')

    } else {
        res.send('it is changed')
        await fileService.writeFile('./db/blogs.json', JSON.stringify(blogs, null ,2))
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

blogRouter.get('/sorted_blogs',async (req, res) => {

    const queryPrams = req.query
    console.log(queryPrams)
    const blog =  await blogController.popularBlogs()

    if(queryPrams.popularity !== 'true'){
        res.status(404).send('No such blog')
    } else if(blog.length === 0){
        res.status(404).send('No such property in an array')
    } else {
        res.send(blog)
    }
  
})


export default blogRouter