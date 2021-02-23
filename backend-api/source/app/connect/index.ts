import mongoose from 'mongoose';
import config from 'config';

const uri : string = config.get('uri');

mongoose.connect(uri, {
    useUnifiedTopology: true, 
    useNewUrlParser:true,
    useCreateIndex: true
},
()=> console.log('we are connected')
)


export default mongoose;