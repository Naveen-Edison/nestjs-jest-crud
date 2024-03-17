import { TypeOrmModule } from '@nestjs/typeorm';

export const DBService = TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'product-crud',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
});
