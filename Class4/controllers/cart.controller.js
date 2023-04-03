import CartModel from "../models/cart.model.js";

const cartModel = new CartModel()

class CartController {

    async addInCart(req, res) {
        const id = req.body.productSelected
        const productBought = {
            date: new Date().toISOString(),
            productSelected: id 
        }

        const product = await cartModel.addInCart(productBought)
        res.status(201).send(`Product with id: ${id} is added to cart`)
        return product
    }

    async getAllProductsInCart(req, res) {
        const products = await cartModel.getAllProductsInCart()
        res.send(products)
    }

    async getProductByIdInCart(req, res) {
        const id = req.params.id
        const product = await cartModel.getProductsInCartById(id)

        res.send(product)
    }

    
}

export default CartController


