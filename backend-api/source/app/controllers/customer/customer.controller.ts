import CustomerModel from '../../models/customer/customer.model';
import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import {Request, Response} from 'express';


/**
 * in this section, i will work on customers registration 
 * . In addition deletion and display customer will be visible only by admin
 * , that means it going to do protected routers.
 * 
 * let's use normal function
*/

// validation function
function fValidationCustomer(req: Request, res:Response)
{
    let {name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({msgError: 'please fill all field'})
    } 
    // if(password.length < 8){
    //     res.status(400).json({msgError: 'password must be at least 8 character'})
    // }
}

function fCheckIfCustomerExist(res:Response,email:string)
{
    
    CustomerModel.findOne({email})
    .then(customer => {
        if(customer) return res.status(400).json('Customer already exists');
    })
    .catch((err: any)=> res.json(err));
}


// function of hash password
function fhashPassword(password: string){
    bcypt.genSalt(10,(err,salt)=>{
        bcypt.hash(password, salt, (err,hash)=>{
            if(err) throw err;
            password = hash
            return password;
        })
    })
}


// register customer 
function fCustomerRegister(req: Request, res:Response){
    
    // first the work on validation
    let {name, email, password } = req.body;
    fValidationCustomer(req,res);
    // let check if Customer exists
    fCheckIfCustomerExist(res,email);
    // encrypting password
    
    let customer = new CustomerModel({name, email, password});

  
    bcypt.genSalt(10,(err,salt)=>{
        bcypt.hash(password, salt, (err,hash)=>{
            if(err) throw err;
            customer.password = hash
            customer.save()
            .then(customer => {
                jwt.sign(
                    {id: customer.id},
                    "jwt_secret",
                    {expiresIn: '1h'},
                    (err, token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            customer:{
                                id:customer.id,
                                name: customer.name,
                                email: customer.email
                            }
                        })
                    }
                    )
            })
            .catch((err:any)=> console.log(err));
        })
    })
   
}

// display customer for admin must be a protected route

function fDisplayCustomer(req:Request, res:Response){
    CustomerModel.find()
    .select('-password')
    .then(customer => res.json(customer))
    .catch((err:any) => res.json(err));
}


// and display one Customer by email address
function fDisplayOneCustomer(req:Request, res:Response){
    let email: string  = req.params.email;
    CustomerModel.findOne({email})
    .select('-password')
    .then(customer => res.json(customer))
    .catch((err:any) => res.json(err));
}


// delete customer function

function fDeleteOneCustomer(req:Request, res:Response)
{
    let id : string = req.params.id;
    CustomerModel.findByIdAndDelete(id)
    .then(customer => res.json(customer))
    .catch((err: any) => res.json(err));
}



export default {
    fCustomerRegister,
    fDeleteOneCustomer,
    fDisplayCustomer,
    fDisplayOneCustomer
}