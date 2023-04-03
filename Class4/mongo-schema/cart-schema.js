import { Schema } from "mongoose";

const cartSchema = new Schema({
    date: {
        type: String
    },
    productSelected: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
})

export default cartSchema