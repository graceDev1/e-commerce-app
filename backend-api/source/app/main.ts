import express, { Application } from 'express';
// import multer from 'multer';

import productRoute from './routes/product.route';
import customerRouter from './routes/customer.route';

let app:Application = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/uploads',express.static('source/app/uploads'));

// product endpoint http://localhost:4000/api/product
app.use('/api/product',productRoute);
app.use('/api/customer',customerRouter);

let port = process.env.PORT || 4000;


app.listen(port,()=> console.log(`server run on port ${port}...`))