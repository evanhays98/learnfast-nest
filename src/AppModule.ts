import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/AuthModule";

@Module({
  imports: [TypeOrmModule.forRoot(
      {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'learnfastnest',
          password: 'learnfastNest',
          database: 'learnfastnest',
          entities: ["../src/**/*Entity.ts"],
          autoLoadEntities: true,
      }
  ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
