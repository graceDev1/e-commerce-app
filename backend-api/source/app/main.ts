import express, {Application} from 'express';

let app:Application = express()

let port = process.env.PORT || 4000;


app.listen(port,()=> console.log(`server run on port ${port}...`))