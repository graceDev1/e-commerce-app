import db from '../../connect';
import ICustomer from './Icustomer';

let CustomerSchema: db.Schema = new db.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})


const Customer = db.model<ICustomer>('Customer',CustomerSchema);

export default Customer;