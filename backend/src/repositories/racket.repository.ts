import { prisma } from '../config/prisma';

export class RacketRepository {

    async findAll() {
        return prisma.racket.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}