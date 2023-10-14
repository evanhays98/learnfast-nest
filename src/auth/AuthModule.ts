import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as controllers from './controllers';
import * as services from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/UserEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_AUTH_SECRET,
      signOptions: { expiresIn: '33333660s' },
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [TypeOrmModule, ...Object.values(services)],
})
export class AuthModule {}
