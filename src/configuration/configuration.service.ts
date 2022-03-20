import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Injectable()
export class ConfigurationService {
    constructor(){
      this.pgHost = process.env.DB_HOST ?? '';
      this.pgPort = process.env.DB_PORT? parseInt(process.env.DB_PORT, 10): 5432;
      this.pgDatabase = process.env.TRAP_DB ?? '';
      this.pgUser = process.env.DB_USERNAME ?? '';
      this.pgPasword = process.env.DB_PASSWORD ?? '';
      this.jwtSecret = process.env.JWT_SECRET ?? '';
    }
    @IsString()
    @IsNotEmpty()
    pgHost: string;

    @IsNumber()
    @IsNotEmpty()
    pgPort: number;

    @IsString()
    @IsNotEmpty()
    pgUser: string;

    @IsString()
    @IsNotEmpty()
    pgPasword: string;

    @IsString()
    @IsNotEmpty()
    pgDatabase: string;

    @IsString()
    @IsNotEmpty()
    jwtSecret: string;
}
