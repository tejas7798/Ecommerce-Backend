import express, { json } from 'express';
export const cartRouter = express.Router();
import { Cart} from '../model/cartModel.js'
import axios from 'axios';

import {verifyToken} from "../controller/tokenGeneration.js";

cartRouter.post('/addToCart',verifyToken, async(request,response)=> {
    const url =  "http://localhost:8080/cart/:username".replace(':username',  request.body.username);
    const result = await axios.get(url);
    const ProductToadd = request.body.productId;
    if(!result.data && request.body.username !== "Guest"){
        const newCart = new Cart({
            username: request.body.username,
            ProductIds : [ProductToadd]
        });
        const created =  await newCart.save();
        response.status(201).send(created);
        return;
    }else{
        result.data.ProductIds.push(ProductToadd);
        const created = await Cart.updateOne({username: request.body.username},{$set : result.data});
        if(created.modifiedCount == 1){
            response.status(201).send(created);
        }else{
            response.status(500).send({message : "Failed to Add Product"});
        }
    }
})

cartRouter.post('/deleteCartItem', verifyToken,async(request,response)=> {
    const url =  "http://localhost:8080/cart/:username".replace(':username',  request.body.username);
    const result = await axios.get(url);
    const productToRemove = request.body.productId;
    result.data.ProductIds = result.data.ProductIds.filter(item => item !== productToRemove);
    const created = await Cart.updateOne({username: request.body.username},{$set : result.data});
    if(created.modifiedCount == 1){
        response.status(201).send(created);
    }else{
        response.status(500).send({message : "Failed to remove Product"});
    }
})


cartRouter.get('/:username',async(request,response)=> {
    const username = request.params.username;
    if(!username){
        response.send(404).json({message : 'Not Found'})
    }
    const products = await Cart.findOne({ username : username }, { _id: 0 });
    response.json(products);
})