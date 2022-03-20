import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from './user.entity';
import * as bcrypt from "bcrypt";

@EntityRepository (User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;

        // hash the password before storing it
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // just save the hashed password
        const user = this.create({username, password: hashedPassword});

        // check to ensure we don't have duplicates
        try{
            await this.save(user);
        }
        catch(error){
            if (error.code === '23505')  {
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException(); // this bubbles up a duplicate user if it happens
            }
        }
    }
}