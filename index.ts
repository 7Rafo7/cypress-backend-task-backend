import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connect} from "mongoose";
import {authRoutes} from "./src/routes/auth.routes";
import {productRoutes} from "./src/routes/product.routes";
import {historyRoutes} from "./src/routes/history.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;
const DATABASE = process.env.DATABASE ?? 'mongodb://127.0.0.1:27017/cypress';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(authRoutes)
app.use(productRoutes)
app.use(historyRoutes)

app.get('/', (req, res) => {
  res.send('Test request');
});


const appStart = () => {
  app.listen(PORT,  async () => {
    console.log(`App listening to the port ${PORT}`)

    await connect(DATABASE)
      .then(() => {
        console.log('Connected to the database successfully');
      }).catch((err: any) => {
        console.log('Could not connect to the database. Error...', err);
        process.exit();
      });
  })
}
appStart();