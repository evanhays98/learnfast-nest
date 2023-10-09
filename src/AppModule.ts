import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(
      {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'learnfastnest',
          password: 'learnfastNest',
          database: 'learnfastnest',
          synchronize: true,
      }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
