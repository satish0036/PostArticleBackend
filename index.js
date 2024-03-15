import dotenv from 'dotenv';
import Express from "express";
import AuthRoutes from "./routes/AuthRoutes.js"
import PostRoutes from "./routes/PostRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const PORT=process.env.PORT || 8800;
const app=Express();

dotenv.config();


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }));
  
  app.use(cookieParser())
  app.use(Express.json())

app.use("/api/auth",AuthRoutes)
app.use("/api/post",PostRoutes)



app.listen(PORT,(req,res)=>{
    console.log("connected to Backend")
    // Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Check if the error is due to connection reset
  if (err.code === 'ECONNRESET') {
    // Respond to the client with an appropriate error message or status code
    res.status(500).json({ error: 'Connection reset' });
  } else {
    // For other types of errors, respond with a generic error message
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add the error handler middleware to your Express app
app.use(errorHandler);

})