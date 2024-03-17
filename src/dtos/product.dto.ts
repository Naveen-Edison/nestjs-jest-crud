import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

export class UpdateProductDTO {
    @ObjectIdColumn()
    _id: ObjectId

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}