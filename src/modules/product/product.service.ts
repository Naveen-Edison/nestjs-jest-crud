import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Product } from './product.entity';
import { ProductInterface } from 'src/interface/product.interface';
import { ProductDTO } from 'src/dtos/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: MongoRepository<Product>
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        return await this.productRepository.findOne({ where: { _id: new ObjectId(id) } });
    }

    async create(product: ProductDTO): Promise<ProductInterface> {
        return this.productRepository.save(product);
    }

    async update(id: string, product: Product): Promise<Product> {
        await this.productRepository.update(id, product);
        return await this.productRepository.findOne({ where: { _id: new ObjectId(id) } });
    }

    async remove(id: string): Promise<any> {
        return await this.productRepository.delete(id);
    }
}
