import { Request, Response } from "express";
import CartModel from "../../Models/cart";
import ICart from "../../../types/models/Models/Cart";

const getCart = async (req: Request, res: Response) => {
  const cartId = req.user.cart;

  const cart: ICart | null = await CartModel.findById(cartId)
    .populate("user", "_id name email cart role")
    .exec();

  res.json({
    cart
  });
};

export default getCart;
