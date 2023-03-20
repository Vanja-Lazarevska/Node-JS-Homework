import BlogModel from "../model/blog.model.js"


const blogModel = new BlogModel()

class BlogController {

    async listAllBlogs() {
        const blogs = await blogModel.getAllBlogs()
        return blogs
    }

    async creatingNewBlogs(id, title, body, author, date, tags) {
       await blogModel.createNewBlog(id, title, body, author, date, tags)
    }

    async editBlog(id, title, body, tags) {
       return await blogModel.editPropertyOfBlog(id, title, body, tags)
    }

    async deleteBlog (id) {
       return await blogModel.deleteOneBlog(id)
    }

    async popularBlogs() {
        return await blogModel.allPopularBlogs()
    }
}

export default BlogController