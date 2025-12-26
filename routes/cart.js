import express, { json } from 'express';
export const cartRouter = express.Router();
import { Cart} from '../model/cartModel.js'
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const getProductsUrl = process.env.getProductsUrl;

import {verifyToken} from "../controller/tokenGeneration.js";

cartRouter.post('/addToCart',verifyToken, async(request,response)=> {
    
    Console.log("ProductToadd " ,ProductToadd);
    const url =  getProductsUrl.replace(':username',  request.body.username);

    Console.log("get product username  " ,url);

    const result = await axios.get(url);
    Console.log("get product username result " ,result);

    const ProductToadd = request.body.productId;
    Console.log("ProductToadd " ,ProductToadd);
    try{

        
                if(!result.data && request.body.username !== "Guest"){
                    Console.log("New data created");
                    const newCart = new Cart({
                        username: request.body.username,
                        ProductIds : [ProductToadd]
                    });
                    const created =  await newCart.save();
                    response.status(201).send(created);
                    return;
                }else{
                    result.data.ProductIds.push(ProductToadd);
                    Console.log("ProductToadd " ,result.data.ProductIds);
                    const created = await Cart.updateOne({username: request.body.username},{$set : result.data});
                    if(created.modifiedCount == 1){
                        console.log("Product Added")
                        response.status(201).send(created);
                    }else{
                        console.log("Product failed to add");
                        response.status(500).send({message : "Failed to Add Product"});
                    }
                }
    }catch(err){
        console.log("Error adding product",err)
    }

})

cartRouter.post('/deleteCartItem', verifyToken,async(request,response)=> {
    const url =  getProductsUrl.replace(':username',  request.body.username);
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