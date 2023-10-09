import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(
      {

      }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
