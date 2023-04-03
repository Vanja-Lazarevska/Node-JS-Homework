import ProductModel from "../models/products.model.js";

const productModel = new ProductModel()

class ProductController {

    async addProduct(productData) {
        await productModel.addProduct(productData)
    }

    async getAllProducts(){
        const products = await productModel.getAllProducts()
        return products
    }

    async getProductById(productId){
        const product = await productModel.getProductById(productId)
        return product
    }

    async getProductByName(productName) {
        const product = await productModel.getProductByName(productName)
        return product
    }
}

export default ProductController