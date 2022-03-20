import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GameModule,
    UserModule,
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,    //TO DO: change this to false and learn how to generate migrations
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
