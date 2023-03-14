import express, { response } from 'express'
import fileService from './file-service.js'
import emmiter from './server.js'




const router = express.Router()
const app = express()

router.get('/', (request, response) => {
    response.send('<h1>Welcome to our online shop</h1>')
    emmiter.emit('endpoint', '/')
})

// 3.add new products
router.post('/create', (request, response) => {
    emmiter.emit('endpoint', '/create')
    const body = request.body
    console.log(body)

    const product = {
        id: body.id,
        name: body.name,
        price: body.price,
        rating: body.rating,
        description: body.description,
        category: body.category,
        isInStock: body.isInStock
    }

    const products = fileService.readFromFile('./products.json')  
    products.push(product)  
    console.log(products)  
    fileService.writeToFile('./products.json', JSON.stringify(products, null, 2))

    response.status(201).send('Products are created')

})

// 1.get all products
router.get('/products', (request, response) => {
    emmiter.emit('endpoint', '/products')
    const content = fileService.readFromFile('./products.json')
    response.send(`<h1>You reached our data base, below are listed all our products</h1>
    ${JSON.stringify(content)}`)
})


// 2.get product by id
router.get('/product/:id', (request, response) => {
    emmiter.emit('endpoint', '/product/:id')
    const params = request.params
    const content = fileService.readFromFile('./products.json')

    const prodyctWeNeed = content.find(product => product.id === params.id)
    if(prodyctWeNeed) {
        response.send(`<h1>You searched for this product of our data base</h1> 
        <div>${JSON.stringify(prodyctWeNeed)}</div>`)
    } else {
        response.status(404).send('<h1>Product not found</h1>')
    }
})

// 4.edit a product by id   sekogas koga koristime patch i sakame nesto da promenime nekoe properti na objekt najdobro e da se pravi so map koja sto veli najdi go prvo objektot so id toj i toj i izmapiraj mi go negovoto properti da bide nesto drugo. ja ga prethodno pravese ss find ama find gu menja i orginalnu nizu.
router.patch('/update/:id', (req, res) => {
    emmiter.emit('endpoint', '/update/:id')
    const content = fileService.readFromFile('./products.json')
    console.log(content)
    const pathParam = req.params
    const id = pathParam.id

        const mapedProducts = content.map(product => {
            if(product.id === id) {
                product.price += 10
                console.log(product)
                return product
            }  
            return product
        })     

        fileService.writeToFile('./products.json', JSON.stringify(mapedProducts, null, 2))

})


// 5.remove a product by id koga koristime delete metoda najdobro e da koristime filter, bidejkji sakame da izbriseme spored dadeno id pa taka zadavame uslov da ni gi isfiltrira site produkti koi imaat id razlicno od id prateno, znaci ke gi vrati site osven onaa pratenoto.
router.delete('/delete/:id', (request, response) => {
    emmiter.emit('endpoint', '/delete/:id')
    const content = fileService.readFromFile('./products.json')
    const id = request.params.id

    const filteredProducts = content.filter(product => product.id !== id) 

    console.log(filteredProducts)

    if(filteredProducts.length === content.length){
        response.send(`Product with id ${id} does not exist, please enter another id`)
    } else{
        response.send(`We deleted the product with id ${id}`)
        fileService.writeToFile('./products.json',JSON.stringify(filteredProducts, null, 2))
    } 
})

// 6. remove all products from products.json
router.delete('/delete_products', (req, res) => {
    emmiter.emit('endpoint', '/delete_products')
    const content = fileService.readFromFile('./products.json')
    const array = ''
    const emptyFile = fileService.writeToFile('./products.json', array)
    res.send('All products deleted')
})


// 7. set products to be out of stock by id
router.patch('/inStock/:id', (request, respone) => {
    emmiter.emit('endpoint', '/inStock/:id')
    const content = fileService.readFromFile('./products.json')
    const id = request.params.id
    const mapedProducts = content.map(product => {
        if(product.id === id && product.isInStock === true){
            product.isInStock = false
            console.log(product)
            return product
        } 
        return product
    })
    fileService.writeToFile('./products.json', JSON.stringify(mapedProducts, null ,2))

})


router.get('/addToCart/:id', (req, res) => {
    emmiter.emit('endpoint', '/addToCart/:id')
    const id = req.params.id
    const cart = fileService.readFromFile('./cart.json')
    const products = fileService.readFromFile('./products.json')

    const filteredProduct = products.find(product => product.id === id)
    if(filteredProduct) {
        res.send('<h1>Product added to cart</h1>')
        cart.push(filteredProduct)
    } else {
        res.status(404).send('<h1>Product not found</h1>')
    }
    
    fileService.writeToFile('./cart.json', JSON.stringify(cart, null, 2))
})

export default router
