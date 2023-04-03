import { Router } from "express";
import ProductController from "../controllers/products.controller.js";

const productController = new ProductController()

const productRouters = Router()

// ADD PRODUCTS
productRouters.post('/', async(req, res) => {
    const {name, description, price} = req.body

    const productData = {
        name: name,
        description: description,
        price: price
    }

   const product = await productController.addProduct(productData)
    res.status(201).send('Product is created')
})

// GET/LIST ALL PRODUCTS
productRouters.get('/', async(req, res) =>{
   const products = await productController.getAllProducts()
    res.send(products)
})

// GET PRODUCT BY ID
productRouters.get('/:id', async(req, res) => {
    const id = req.params.id
    const product = await productController.getProductById(id)
    res.send(product)
})

// SEARCH FOR PRODUCT BY ID/NAME
productRouters.post('/byName', async (req, res)=> {
    const name = req.body.name
    console.log('NAME',name)

   const product =  await productController.getProductByName(name)
   res.send(product)
})

export default productRouters
