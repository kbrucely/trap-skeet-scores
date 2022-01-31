import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Shooter } from "./shooter.entity";

export const GetShooter = createParamDecorator((_data, ctx: ExecutionContext): Shooter => {
    const req = ctx.switchToHttp().getRequest();
    return req.shooter;
});