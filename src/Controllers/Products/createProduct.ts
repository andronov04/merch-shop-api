import { Request, Response } from "express";
import ProductModel from "../../Models/product";
import internalServerError from "../../Errors/internalServerError";
import IProduct from "../../../types/models/Models/Product";
import { saveImage } from "../../util/s3";

const createProduct = async (req: Request, res: Response) => {
  req.body.imageName = req.file.filename;
  try {
    await saveImage(req.file);
    const product: IProduct = new ProductModel(req.body);
    await product.save();
    res.status(201).json({
      message: "Product Created",
      product: {
        name: product.name,
        _id: product._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default createProduct;
