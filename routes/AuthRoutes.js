
import express from "express";
import { logout } from "../controllers/AuthConttrollers.js";
import { login } from "../controllers/AuthConttrollers.js";
import { signup } from "../controllers/AuthConttrollers.js";
const AuthRoutes = express.Router()

// AuthRoutes.get("/test",(reg,res)=>{
//     res.send("it works")
// })
 
AuthRoutes.post("/login",login)
AuthRoutes.post("/signup",signup)
AuthRoutes.post("/logout",logout)
export default AuthRoutes



