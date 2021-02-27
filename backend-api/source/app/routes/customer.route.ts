import express, {Router} from 'express';
import customerController from '../controllers/customer/customer.controller';

let router : Router = express.Router();

// register router 
router.post('/',customerController.fCustomerRegister);

// display all customers
router.get('/',customerController.fDisplayCustomer);

// display one customer by email address
router.get('/:email',customerController.fDisplayOneCustomer);


// delete one  customer 
router.delete('/:id', customerController.fDeleteOneCustomer);


export default router;