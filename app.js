import express from "express";
import {connectDB} from './connection.js';
import {router,LoginRouter} from './routes/products.js';
import { cartRouter } from "./routes/cart.js";
import { tokenRouter } from "./routes/token.js";
import cors from 'cors';
const app =express();
import dotenv from 'dotenv';
dotenv.config();
const FRONT_END = process.env.FRONT_END;
const port = 8080;

//mongo connect 
connectDB();

app.use(express.json());    

const corsOptions = {
    origin: FRONT_END,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', FRONT_END);
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// Routes
app.use('/api/products', router);

app.use('/app/login',LoginRouter);

app.use('', tokenRouter);

app.use('/cart',cartRouter);
//starting server on 8080 port
app.listen(port,(error)=>{
    if(!error){
        console.log("App listening on 8080");
    }       
    else{
        console.log("Error in connecting server");
    }
})

