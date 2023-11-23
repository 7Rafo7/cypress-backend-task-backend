import {model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const ProductModel = model('Product', productSchema, 'products')