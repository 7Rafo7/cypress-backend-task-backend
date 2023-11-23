import {model, Schema} from "mongoose";

const HistorySchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const HistoryModel = model("History", HistorySchema, 'history')