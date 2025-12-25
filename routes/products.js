import express, { json } from 'express';
import {Login ,Product} from '../model/product.js';
import { request,response } from 'express';
import LoginController from '../controller/LoginController.js'

export const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({id : req.params.id});
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// POST create product
router.post('/', async (req, res) => {
    if (res.header){
        const product = new Product(req.body);
        const created = await product.save();
        res.status(201).json(created);
    }
    res.status(403).send("Unauthorised !!");    
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});


//Login  Router
export const LoginRouter = express.Router();

LoginRouter.post('/', async(request,response)=> {

     try {   
      await LoginController.ValidateLogin(request.body)
        .then((result) => {
          console.log("Backend", result);
          response.json({status :200,message:"Login Success"});
        }).catch((err) => { 
          response.json({status :403,message :"User Not Authorise"});
        });
    
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).send("Internal Server Error");
  }
});

LoginRouter.post('/register', async(request,response)=> {

     try {   
      await LoginController.registerNewUser(request.body)
        .then((result) => {
          response.json({status :200,message:"Registered Success"});
        }).catch((err) => { 
          response.json({status :403,message : err});
        });
    
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
});


