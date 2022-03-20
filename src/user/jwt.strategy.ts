import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigurationService } from "../configuration/configuration.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigurationService,
        ){
        super({
            secretOrKey: configService.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
// check the username in the jwt payload and make sure that we can find that user in the database
//  if we can't find the user, throw a 401 back for the request.
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.UserRepository.findOne({ username });

        if (!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}