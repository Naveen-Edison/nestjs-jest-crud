import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UsePipes,
    ValidationPipe,
    HttpException,
    HttpStatus,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
    UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductInterface } from '../../interface/product.interface';
import { ProductDTO } from '../../dtos/product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @Roles(['admin'])
    findAll(): Promise<Product[]> {
        // throw new BadRequestException('400 Bad Request','BadRequestException');
        // throw new NotFoundException('Not Found 404 !','Not Found');
        // throw new UnauthorizedException('Unauthorized', 'Access Denied');

        try {
            return this.productService.findAll();
        } catch (error) {

            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get(':id')
    @Roles(['admin'])
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @Post()
    create(@Body() product: ProductDTO): Promise<ProductInterface> {
        return this.productService.create(product);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productService.remove(id);
    }
}
