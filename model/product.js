import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id :{type :Number,required:true},
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    rating : {type:Number},
    category : {type : String }
  }
);


const LoginSchema = new mongoose.Schema(
  {
    username : {type:String,required:true},
    email : { type : String ,required: true },
    password : { type: String, required: true }
  }
);

export const Login = mongoose.model('Login', LoginSchema);

export const Product = mongoose.model('products', productSchema);
