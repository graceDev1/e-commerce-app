import mongoose from 'mongoose';
// import config from 'config';

// const uri : string = config.get('uri');

mongoose.connect('mongodb://127.0.0.1:27017/SaraShop', {
    useUnifiedTopology: true, 
    useNewUrlParser:true,
    useCreateIndex: true
}
)
.then(()=> console.log('we are connected'))
.catch((err:any)=> console.log(err));

export default mongoose;