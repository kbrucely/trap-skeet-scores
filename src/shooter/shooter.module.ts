import { Module } from '@nestjs/common';
import { ShooterService } from './shooter.service';
import { ShooterController } from './shooter.controller';

@Module({
  providers: [ShooterService],
  controllers: [ShooterController]
})
export class ShooterModule {}
