import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ShooterModule } from './shooter/shooter.module';

@Module({
  imports: [GameModule, ShooterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
