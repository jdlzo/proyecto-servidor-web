import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { describe, expect, it, vi } from 'vitest';
import { JwtAuthGuard } from './jwt-auth.guard.js';

function createContext(request: { headers: { authorization?: string }; user?: unknown }) {
    return {
        switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
}

describe('JwtAuthGuard', () => {
    it('rejects requests without a bearer token', async () => {
        const guard = new JwtAuthGuard({ verifyAsync: vi.fn() } as unknown as JwtService);

        await expect(guard.canActivate(createContext({ headers: {} })))
            .rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('accepts a valid bearer token and attaches its payload', async () => {
        const payload = { sub: 7, cedula: '1234567890' };
        const jwtService = { verifyAsync: vi.fn().mockResolvedValue(payload) } as unknown as JwtService;
        const guard = new JwtAuthGuard(jwtService);
        const request: any = { headers: { authorization: 'Bearer valid-token' } };

        await expect(guard.canActivate(createContext(request))).resolves.toBe(true);
        expect(request.user).toEqual(payload);
    });
});