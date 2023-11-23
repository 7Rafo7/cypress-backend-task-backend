import {Request, Response} from "express";
import {ProductModel} from "../models/product.model";

export const getAll = async (req: Request, res: Response)=> {
  try {
    const products = await ProductModel.find();

    res.status(200).send(products)
  } catch (e) {
    res.status(400).send(e)
  }
}

export const getOne = async (req: Request, res: Response)=> {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ message: 'ID is missing' });
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(401).json({ message: 'Product with this id is missing' });
    }


    res.status(200).send(product)
  } catch (e) {
    res.status(400).send(e)
  }
}

export const create = async (req: Request, res: Response)=> {
  try {
    const { name, price } = req.body;
    console.log({ name })

    if (!name || !price) {
      return res.status(401).json({ message: 'Missing field' });
    }

    const product = await new ProductModel({
      name,
      price
    }).save()

    res.status(200).send(product)
  } catch (e) {
    res.status(400).send(e)
  }
}

export const update = async (req: Request, res: Response)=> {
  try {
    const id = req.params.id;
    const { name, price } = req.body;

    if (!id) {
      return res.status(401).json({ message: 'ID is missing' });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(401).json({ message: 'Product with this id is missing' });
    }

    const updated = await ProductModel.findOneAndUpdate({id}, {name, price}, {new: true});

    res.status(200).send(updated)
  } catch (e) {
    res.status(400).send(e)
  }
}

export const remove = async (req: Request, res: Response)=> {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({ message: 'ID is missing' });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(401).json({ message: 'Product with this id is missing' });
    }

    await ProductModel.deleteOne({id})

    res.status(200).send({msg: "Deleted successfully"})
  } catch (e) {
    res.status(400).send(e)
  }
}