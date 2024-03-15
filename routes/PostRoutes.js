import express from "express";
import { addHeading } from "../controllers/PostControllers.js";
import { addContent } from "../controllers/PostControllers.js";
import { deletePost } from "../controllers/PostControllers.js";
import { getHeading } from "../controllers/PostControllers.js";
import { getContent } from "../controllers/PostControllers.js";
const PostRoutes = express.Router()
 
// PostRoutes.get("/test",(reg,res)=>{
//     res.send("it works")
// })

PostRoutes.post("/addHeading",addHeading)
PostRoutes.post("/addContent",addContent)
PostRoutes.get("/getHeading",getHeading)
PostRoutes.get("/getContent/:articleId",getContent)
PostRoutes.delete("/deletePost/:articleId",deletePost)

 
export default PostRoutes