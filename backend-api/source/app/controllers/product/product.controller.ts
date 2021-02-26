import ProductModel from '../../models/product/product.model';
import { Request, Response} from 'express';


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
    - First the upload the file with multer will be in router file
    - then save to the database
*/

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
let fUpdateProduct = async (req: Request, res:Response) =>{
    let {name, price, description,digital} = req.body;
    let file = req.file.path;
    let image : string = file.substring(11);
    let id : string = req.params.id;
    await ProductModel.findByIdAndUpdate(id, {name,price,description,digital,image},{new:true,overwrite:true})
    .then(result => res.status(200).json(result))
    .catch((err:any)=> res.status(500).json(err));
    
}

// DELETE api/product/:id
let fDeleteProduct = async (req: Request, res:Response) =>{
    let id: string = req.params.id;
    await ProductModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch((err:any)=> res.json(err));
}


export default {
    fGetOneProduct,
    fGetProduct, 
    fPostProduct,
    fUpdateProduct,
    fDeleteProduct
};