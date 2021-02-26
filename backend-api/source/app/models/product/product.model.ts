import db from '../../connect';

let ProductSchema = new db.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    digital:{
        type: Boolean,
        required: false,
    },
    image: {
        type:String,
        required: true
    }

});

const Product = db.model('Product', ProductSchema);

export default Product;