import mongoose from "mongoose";
import cartSchema from "../mongo-schema/cart-schema.js";

class CartModel {
    mongo_model;
    constructor(){
        this.mongo_model = mongoose.model('Cart',cartSchema, 'Carts')
    }

    async addInCart(productId){
        const product = await new this.mongo_model(productId)
        
        await product.save()
    }

    async getAllProductsInCart() {
        const cart = await this.mongo_model.find().populate('productSelected')
        return cart
    }

    async getProductsInCartById(id) {
        const cart = await this.mongo_model.findById(id).populate('productSelected')
        return cart
    }


}

export default CartModel