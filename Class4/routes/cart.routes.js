import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = Router()
const cartController = new CartController()

cartRouter.post('/', cartController.addInCart)
cartRouter.get('/', cartController.getAllProductsInCart)
cartRouter.get('/:id', cartController.getProductByIdInCart)


export default cartRouter

