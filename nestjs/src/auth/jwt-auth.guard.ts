import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedRequest {
    headers: { authorization?: string };
    user?: { sub: number; cedula: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const [scheme, token, ...extra] = (request.headers.authorization ?? '').split(' ');

        if (scheme?.toLowerCase() !== 'bearer' || !token || extra.length > 0) {
            throw new UnauthorizedException('Se requiere un token Bearer');
        }

        try {
            const payload = await this.jwtService.verifyAsync<{ sub: number; cedula: string }>(token);
            if (typeof payload.sub !== 'number' || typeof payload.cedula !== 'string') {
                throw new UnauthorizedException('Token inválido');
            }
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}