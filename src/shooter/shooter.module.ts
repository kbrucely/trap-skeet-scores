import { Module } from '@nestjs/common';
import { ShooterService } from './shooter.service';
import { ShooterController } from './shooter.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShooterRepository } from './shooter.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigurationModule } from "../configuration/configuration.module";
import { ConfigurationService } from "../configuration/configuration.service";
import { config } from 'process';

@Module({
  imports: [
    ConfigurationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ 
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: 3600,
        }
      }),
    }),
    TypeOrmModule.forFeature([ShooterRepository]),
  ],
  providers: [ShooterService, JwtStrategy],
  controllers: [ShooterController],
  exports: [JwtStrategy, PassportModule],
})
export class ShooterModule {}