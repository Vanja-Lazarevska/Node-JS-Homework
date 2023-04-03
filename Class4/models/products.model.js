import productSchema from "../mongo-schema/products.schemas.js";
import mongoose from "mongoose";



class ProductModel {
    mongo_model;

    constructor() {
        this.mongo_model = mongoose.model('Product', productSchema, 'Products')
    }

    async addProduct(productData) {
        const product = new this.mongo_model(productData)
        await product.save()
    }

    async getAllProducts() {
        const products = await this.mongo_model.find()
        return products  
    }

    async getProductById(productId) {
        const product = await this.mongo_model.findById(productId)
        return product
    }

    async getProductByName(productName) {
        const product = await this.mongo_model.find({name:{ $regex: productName} })
        return product
    }

}

export default ProductModel