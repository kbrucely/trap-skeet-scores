import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {

    pgHost: string;
    pgPort: number;
    pgUser: string;
    pgPasword: string;
    pgDatabase: string;
    jwtSecret: string;

    constructor(){
      this.pgHost = process.env.DB_HOST ?? '';
      this.pgPort = process.env.DB_PORT? parseInt(process.env.TRAP_PORT, 10): 5432;
      this.pgDatabase = process.env.TRAP_DB;
      this.pgUser = process.env.DB_USERNAME ?? '';
      this.pgPasword = process.env.DB_PASSWORD ?? '';
      this.jwtSecret = process.env.JWT_SECRET ?? '';
    }
}
