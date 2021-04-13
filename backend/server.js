import dotenv from 'dotenv';
import  express from 'express';
const app = express();
dotenv.config();
import  products from './data/products.js';


app.get('/',(req,res)=>{
    res.send('api is good')
})

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p=>p._id === req.params.id );
    res.json(product);
})






app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})