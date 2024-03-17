import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './modules/product/product.entity';
import { ProductService } from './modules/product/product.service';
import { ProductController } from './modules/product/product.controller';
import { DBService } from './service/db.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/roles.guard';

@Module({
    imports: [DBService, TypeOrmModule.forFeature([Product]), AuthModule, UsersModule],
    controllers: [ProductController],
    providers: [ProductService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule { }
