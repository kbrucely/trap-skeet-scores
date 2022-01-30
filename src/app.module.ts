import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ShooterModule } from './shooter/shooter.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GameModule,
    ShooterModule,
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.pgHost,
        port: configService.pgPort,
        username: configService.pgUser,
        password: configService.pgPasword,
        database: configService.pgDatabase,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
