import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/AuthModule';
import { WorkModule } from './work/WorkModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-snowy-bread-78264015.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'evanhays98',
      password: 'Fq17BJVfRtkW',
      database: 'neondb',
      entities: ['../src/**/*Entity.ts'],
      synchronize: false,
      autoLoadEntities: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
          sslmode: 'require',
        },
      },
    }),
    AuthModule,
    WorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
