import express,{ Router, Request } from 'express';
import productController from '../controllers/product/product.controller';
import multer from 'multer';


let router : Router = express.Router();

// get all product
router.get('/', productController.fGetProduct);


// get one single product
router.get('/:id', productController.fGetOneProduct);


// get image and upload image code

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './source/app/uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})


const fileFilter = (req:Request, file:any, cb: any) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(null, false);
    }
}

// limit the size of th efile
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
});

// post request
router.post('/', upload.single('image'),productController.fPostProduct);


// patch request
router.patch('/:id', upload.single('image'),productController.fUpdateProduct);

// delete product
// /api/product/:id
router.delete('/:id',productController.fDeleteProduct);


export default router;