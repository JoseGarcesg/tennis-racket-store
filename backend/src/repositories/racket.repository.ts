import { prisma } from '../config/prisma';

export class RacketRepository {

    async findAll() {
        return prisma.racket.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findById(id: number) {
        return prisma.racket.findUnique({
            where: { id }
        });
    }

    async decrementStock(
        id: number,
        quantity: number
    ) {
        return prisma.racket.update({
            where: { id },
            data: {
                stock: {
                    decrement: quantity
                }
            }
        });
    }
}