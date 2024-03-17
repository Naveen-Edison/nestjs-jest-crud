import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDTO } from '../../dtos/product.dto';
import { UpdateProductDTO } from '../../dtos/product.dto';

describe('ProductController', () => {
    let controller: ProductController;

    const mockProductRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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

        jest.spyOn(mockProductRepository, 'create').mockReturnValue(product);

        // act
        const result = await controller.create(productdto);

        // assert
        expect(mockProductRepository.create).toBeCalled();
        expect(mockProductRepository.create).toBeCalledWith(productdto);

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
        jest.spyOn(mockProductRepository, 'findAll').mockReturnValue(products);

        //act
        const result = await controller.findAll();

        // assert
        expect(result).toEqual(products);
        expect(mockProductRepository.findAll).toBeCalled();
    });

    it('findOne => should find a product by a given id and return its data', async () => {
        //arrange
        const _id = '1';
        const product = {
            _id: '1',
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };

        jest.spyOn(mockProductRepository, 'findOne').mockReturnValue(product);

        //act
        const result = await controller.findOne(_id);

        expect(result).toEqual(product);
        expect(mockProductRepository.findOne).toBeCalled();
        expect(mockProductRepository.findOne).toBeCalledWith(_id);
    });

    it('update => should find a product by a given id and update its data', async () => {
        //arrange
        const _id = '1';

        const updateProductDto = {
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        } as UpdateProductDTO;

        const product = {
            _id: 1,
            name: 'Redmi Not 7 Pro',
            price: 10000,
            description: 'Android Mobile',
        };

        jest.spyOn(mockProductRepository, 'update').mockReturnValue(product);

        //act
        const result = await controller.update(_id, updateProductDto);

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

        jest.spyOn(mockProductRepository, 'remove').mockReturnValue(product);

        //act
        const result = await controller.remove(id);

        expect(result).toEqual(product);
        expect(mockProductRepository.remove).toBeCalled();
        expect(mockProductRepository.remove).toBeCalledWith(id);
    });

});
