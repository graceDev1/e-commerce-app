import express, { Application } from 'express';
// import multer from 'multer';

let app:Application = express()
app.use(express.json())
// app.use();

let port = process.env.PORT || 4000;


app.listen(port,()=> console.log(`server run on port ${port}...`))