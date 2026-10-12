import { Repository } from 'typeorm';
import { describe, expect, it, vi } from 'vitest';
import { asistencia } from './entities/asistencia.entity.js';
import { FilterAsistenciaDto } from './dto/asistencia.dto.js';
import { AsistenciaService } from './asistencia.service.js';

describe('AsistenciaService.findAll', () => {
    it('applies filters, pagination, ordering, and returns pagination metadata', async () => {
        const findAndCount = vi.fn().mockResolvedValue([[], 11]);
        const repository = { findAndCount } as unknown as Repository<asistencia>;
        const service = new AsistenciaService(repository);
        const filters = Object.assign(new FilterAsistenciaDto(), {
            usuarioid: 3,
            fecha: '2026-10-11',
            estado: 'FALTA',
            page: 2,
            limit: 5,
            sortBy: 'fecha',
            sortOrder: 'ASC',
        });

        const result = await service.findAll(filters);

        expect(findAndCount).toHaveBeenCalledWith({
            where: { usuarioid: 3, fecha: '2026-10-11', estado: 'FALTA' },
            skip: 5,
            take: 5,
            order: { fecha: 'ASC' },
        });
        expect(result).toEqual({
            data: [],
            meta: {
                page: 2,
                limit: 5,
                totalItems: 11,
                totalPages: 3,
                hasNextPage: true,
                hasPreviousPage: true,
                sortBy: 'fecha',
                sortOrder: 'ASC',
            },
        });
    });
});