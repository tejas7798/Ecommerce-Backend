import { json, response } from "express";
import {Login} from '../model/product.js'

const  tokenDetails ={
  "name": "Tejas",
  "email": "tejas@example.com",
  "password": "123456"
}
class LoginController{


    static async getUser(emailId) {
        try {
            const user = await Login.findOne({ email: emailId });
            return user; // Return plain user object
        } catch (err) {
            console.error("Error fetching user:", err);
            throw err;
        }
    }
    
    static ValidateLogin(body) {
        return new Promise(async (resolve,reject)=>{
            const emailId = body.email; 
            const password = body.password;
            console.log("Login attempt:", emailId, password);
    
            const user = await LoginController.getUser(emailId)
            

                const result= LoginController.validatePassword(user,password);
                if(result){
                    resolve();
                }
                reject();
        })
    }
    
    static registerNewUser(body) {
        return new Promise(async (resolve,reject)=>{
            const emailId = body.email; 
            const password = body.password;
            const username = body.email.split('@')[0];
            console.log("Login attempt:", emailId, password);
    
            const user = await LoginController.getUser(emailId)
            
            if(user){
                //return if user already exists
                reject("User already exists");
            }
            else{
                const newUser = new Login({
                    email: emailId,
                    password: password,
                    username: username
                });
                await newUser.save();
                resolve();
            }
        })
    }
                        
    static validatePassword(user,password){
        
    // ✅ Compare password
        if(user !== undefined && user!== null ){
            if(user.password === password){
                console.log("Authentication Successfull");
                return true;
            }
        }
        console.log("Authentication failed");
        return false;
    }

}

export default LoginController;