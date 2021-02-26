import ProductModel from '../../models/product/product.model';
import { Request, Response} from 'express';
import multer from 'multer';

// GET api/product
let fGetProduct= (req:Request, res: Response) => {
    ProductModel.find()
    .then(data => res.json(data))
    .catch((err:any)=> res.json({msg:err}));
}

// GET api/product/:id
let fGetOneProduct = (req:Request, res:Response) => {
    let id:string = req.params.id;
    ProductModel.findById(id)
    .then(data => res.json(data))
    .catch((err:any)=> res.json({msg:err}));
}


/*
before making a post request to the product we have, 
to do multer first.
    - First the upload the file with multer
    - 
*/

let fFileUpload = (filename:any) =>{
    let storage = multer.diskStorage({
        destination: (req:Request,filename,cb)=>{
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.filename + '-'+Date.now())
        }
    })
    var upload = multer({storage})
    return upload;
}

// validation function
let fValidator = (req:Request, res: Response) => {
    let {name, price, description,digital} = req.body;
    let image = req.file.path;
    if(!name || !price || !description || !digital || !image){
        return res.status(501).json({msg: 'please fill all field'})
    }
}

// POST api/product
let fPostProduct = (req:Request, res:Response) =>{
     let {name, price, description,digital} = req.body;
     let file = req.file.path;
     let image : string = file.substring(11)
     fValidator(req,res);
    //  console.log(file.substring(11));
     let product = new ProductModel({name, price, description,digital,image});
     product.save()
     .then(result => {
         res.json(result);
     })
     .catch((err: any)=>{
         res.status(500).json(err);
     })
}


// PATCH api/product/:id
// DELETE api/product/:id

export default {fGetOneProduct,fGetProduct, fPostProduct};