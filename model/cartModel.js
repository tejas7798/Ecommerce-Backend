import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {

    username : { type : String ,required: true },
    ProductIds : { type: [] }
  }
);

export const Cart = mongoose.model('Cart', CartSchema);