import {Document} from 'mongoose';

export default interface ICustomer extends Document{
    name: string;
    email: string;
    password: string;
    createAt: Date
}