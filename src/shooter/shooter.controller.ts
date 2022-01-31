import { Body, Controller, Post } from '@nestjs/common';
import { ShooterService } from './shooter.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('shooter')
export class ShooterController {
    constructor(
        private shooterService: ShooterService
    ) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.shooterService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        return this.shooterService.signIn(authCredentialsDto);
    }
}