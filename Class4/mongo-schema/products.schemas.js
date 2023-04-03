import { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true 
    },
    price: {
        type: Number,
        require: true
    },
    reviews: []

})

export default productSchema