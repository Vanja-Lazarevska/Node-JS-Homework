import { Router } from "express";
import productRouters from "../routes/products.routes.js";
import cartRouter from "../routes/cart.routes.js";


const router = Router();

router.get('/', (req, res) => {
    res.send("Server is live.")
});

router.use('/products', productRouters)
router.use('/cart', cartRouter)

export default router;