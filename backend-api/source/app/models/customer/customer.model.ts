import db from '../../connect';

let CustomerSchema = new db.Schema({
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


const Customer = db.model('Customer',CustomerSchema);

export default Customer;