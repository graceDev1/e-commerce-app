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
    digital:{
        type: Boolean,
        required: false,
    },
    image: {
        data: Buffer,
        contentType: String
    }

});

const Product = db.model('Product', ProductSchema);

export default Product;