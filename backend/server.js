import dotenv from 'dotenv';
import  express from 'express';
const app = express();
dotenv.config();
import connectDB from './config/db.js'

//? custom error handler
import {notFound , errorHandler} from './middleware/errorMiddleware.js'; 


//? Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

//? body parser
app.use(express.json())

//? use Routes
app.use('/api/products' ,productRoutes  )
app.use('/api/users' ,userRoutes  )



connectDB();//? connect with Mongo_DB;




app.get('/',(req,res)=>{
    res.send('api is good')
})






//!404 error handler - this runs at last when no other route dont get activated , this means the route user requested 
//! not supported by our app , thats why this will be put at bottom of our app
app.use(notFound)
//! custom error handler - this get activate only when our app has error.
app.use(errorHandler)



app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})