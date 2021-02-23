import db from '../../connect';
import Product from '../product/product.model';
import Order from '../order/order.model';
import { Schema } from 'mongoose';

let OrderItemSchema = new db.Schema({
    quantity:{
        type: Number,
        required: true
    },
    date_added:{
        type: Date,
        default: Date.now
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const OrderItem = db.model('OrderItem', OrderItemSchema);

export default OrderItem;