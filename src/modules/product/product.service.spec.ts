import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDTO } from '../../dtos/product.dto';
import { UpdateProductDTO } from '../../dtos/product.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

describe('ProductService', () => {
    let service: ProductService;

    const mockProductRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository
                }
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create => Should create a new product and return its data', async () => {
        // arrange
        const productdto = {
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        } as ProductDTO;

        const product = {
            // _id: new ObjectId(Date.now()),
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        } as Product;

        jest.spyOn(mockProductRepository, 'save').mockReturnValue(product);

        // act
        const result = await service.create(productdto);

        // assert
        expect(mockProductRepository.save).toBeCalled();
        expect(mockProductRepository.save).toBeCalledWith(productdto);

        expect(result).toEqual(product);
    });


    it('findAll => should return an array of product', async () => {
        //arrange
        const product = {
            id: Date.now(),
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };
        const products = [product];
        jest.spyOn(mockProductRepository, 'find').mockReturnValue(products);

        //act
        const result = await service.findAll();

        // assert
        expect(result).toEqual(products);
        expect(mockProductRepository.find).toBeCalled();
    });

    it('findOne => should find a product by a given id and return its data', async () => {
        //arrange
        const _id = '65486a59e294cce4279faa8d';
        const product = {
            _id: new ObjectId('65486a59e294cce4279faa8d'),
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };

        jest.spyOn(mockProductRepository, 'findOne').mockReturnValue(product);

        //act
        const result = await service.findOne(_id);

        expect(result).toEqual(product);
        expect(mockProductRepository.findOne).toBeCalled();
        expect(mockProductRepository.findOne).toBeCalledWith({ where: { _id: product._id } });
    });

    it('update => should find a product by a given id and update its data', async () => {
        //arrange
        const _id = '65486a59e294cce4279faa8d';

        const updateProductDto = {
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        } as UpdateProductDTO;

        const product = {
            _id: new ObjectId('65486a59e294cce4279faa8d'),
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };

        jest.spyOn(mockProductRepository, 'update').mockReturnValue(product);

        //act
        const result = await service.update(_id, updateProductDto);

        expect(result).toEqual(product);
        expect(mockProductRepository.update).toBeCalled();
        expect(mockProductRepository.update).toBeCalledWith(_id, updateProductDto);
    });


    it('remove => should find a product by a given id, remove and then return Number of affected rows', async () => {
        const id = '1';
        const product = {
            id: 1,
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };

        jest.spyOn(mockProductRepository, 'delete').mockReturnValue(product);

        //act
        const result = await service.remove(id);

        expect(result).toEqual(product);
        expect(mockProductRepository.delete).toBeCalled();
        expect(mockProductRepository.delete).toBeCalledWith(id);
    });

});
