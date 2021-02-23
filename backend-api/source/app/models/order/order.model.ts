import { Schema} from 'mongoose';
import db from '../../connect';
import Customer from '../customer/customer.model';

let OrderSchema = new db.Schema({
    date_ordered: {
        type: Date,
        default: Date.now
    },
    complete:{
        type: Boolean,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    }
});

const Order = db.model('Order', OrderSchema);

export default Order;

