import {Request, Response} from "express";
import {HistoryModel} from "../models/history.model";

export const getAll = async (req: Request, res: Response) => {
  try {
    const history = await HistoryModel.find();

    res.status(200).send(history)
  } catch (e) {
    res.status(400).send(e)
  }
}
export const create = async (req: Request, res: Response) => {
  const { userId, username, price, products } = req.body

  if (!userId || !username || !price || !products.length) {
    return res.status(401).json({ message: 'Missing field' });
  }

  const history = await new HistoryModel({
    userId,
    username,
    products,
    price
  }).save()

  res.status(200).send(history)
}