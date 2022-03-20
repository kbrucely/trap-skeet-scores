import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        return this.userService.signIn(authCredentialsDto);
    }
}