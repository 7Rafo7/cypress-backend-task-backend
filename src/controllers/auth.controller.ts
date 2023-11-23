import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserModel} from "../models/user.model";


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'your_secret_key');

    res.json(token)
  } catch (e){
    res.status(400).send(e)
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, fullName, role } = req.body;
    if (!username || !password || !fullName) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const exist = await UserModel.findOne({ username });

    if (exist) {
      return res.status(401).json({ message: 'User with that username is exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      password: hashedPassword,
      fullName,
      role
    });

    const newUser = await user.save();

    res.status(200).send(newUser)
  } catch (e){
    res.status(400).send(e)
  }
}