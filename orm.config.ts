import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export = [
    {
        name: 'blog',
        type: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'NnVvGET',
        database: 'gb_news',
        port: 5432,
        logging: false,
        migrationsRun: false,
        synchronize: false,
        migrations: ['src/db/migrations/*.ts'],
        entities: ['src/db/entities/*.ts'],
    },
] as TypeOrmModuleOptions[];
