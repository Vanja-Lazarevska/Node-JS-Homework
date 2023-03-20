import fileService from "../file_service_modules/file-service.js"
import { Blog } from "../entities/blog-entity.js"



class BlogModel {
    async getAllBlogs() {
        const allBlogs = await fileService.readFile('./db/blogs.json')
        const blogs = JSON.parse(allBlogs)
        console.log(blogs)
        return blogs
    }

    async createNewBlog(id, title, body, author, date, tags) {
        const allBlogs = await fileService.readFile('./db/blogs.json')
        const blogs = JSON.parse(allBlogs)

        const newBlog = new Blog(id, title, body, author, date, tags)

        blogs.push(newBlog)
        console.log(blogs)

        await fileService.writeFile('./db/blogs.json', JSON.stringify(blogs, null, 2))

    }

    async editPropertyOfBlog(id, title, body, tags) {
        const allBlogs = await fileService.readFile('./db/blogs.json')
        const blogs = JSON.parse(allBlogs)
        const blogFound = blogs.filter(blog => blog.id === id)
        console.log('OD FILTER',blogFound) //NIZA OD 1 OBJEKT
        
        if (blogFound.length !== 0) {
            blogFound.map(blog => {
                if (title) {
                    blog.title = title
                }
                if (body) {
                    blog.body = body
                }
                if (tags) {
                    blog.tags = tags
                }
                console.log('STO KE SE PUSHNE', blogFound)  //NIZA OD EDN PROMENET OBJEKT
                // bez push funkcionira kako sto treba, a so dodadeno push mi vrakja niza od dva objekta od koi edniot e isfiltriran i dodadena uste edna niza so isfiltriraniot objekt
                // blogs.push(blogFound)    
            })
            console.log('BLOGS STO KE SE PRATI', blogs) //NIZA OD DVA OD KOI EDN E PROMENET OBJEKT
            return blogs

        } else {
            return []
        }


    }

    deleteOneBlog(id) {
        return new Promise(async (resolve, reject) => {
            const allBlogs = await fileService.readFile('./db/blogs.json')
            const blogs = JSON.parse(allBlogs)

            const filteredBlogs = blogs.filter(blog => blog.id !== id)

            if (filteredBlogs.length === blogs.length) {
                reject({ message: `No such blog with id ${id}` })
            } else {
                resolve(await fileService.writeFile('./db/blogs.json', JSON.stringify(filteredBlogs, null, 2)))
            }
        })

    }

    async allPopularBlogs() {
        const allBlogs = await fileService.readFile('./db/blogs.json')
        const blogs = JSON.parse(allBlogs)
        const popularblog = blogs.filter(blog => blog.tags.find(tag => tag === 'true'))
        return popularblog
    }
}

export default BlogModel