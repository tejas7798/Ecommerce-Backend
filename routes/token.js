import express, { json } from 'express';
export const tokenRouter = express.Router();
import jwt from "jsonwebtoken";

tokenRouter.post('/get/token', (request,response)=> {
    let tokenPayload =  request.body.tokenPayload;
    let secret = request.body.secret;

    // Generate token
    const token = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });

    response.status(200).send({"TOKEN": token});

})
