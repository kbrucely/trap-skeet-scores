import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ShooterRepository } from './shooter.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class ShooterService {
    constructor(
        @InjectRepository(ShooterRepository)
        private shooterRepository: ShooterRepository,
        private jwtService: JwtService,
    )
    {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.shooterRepository.createShooter(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.shooterRepository.findOne({ username });

        // compare the has of the incoming user submitted password with the one in the database
        //  no decryption will be happening.  If it works, send an access token back for use.
        // if it fails, then throw a 401 back at the user.
        if ( user && (await bcrypt.compare(password, user.password))){
            const payload : JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new UnauthorizedException('Please check your sign in credentials!');
        }
    }
}