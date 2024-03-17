import { ObjectId } from 'mongodb';

export interface ProductInterface {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
}
