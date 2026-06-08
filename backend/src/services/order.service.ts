import { prisma } from '../config/prisma';
import { OrderRepository } from '../repositories/order.repository';
import { RacketRepository } from '../repositories/racket.repository';

import { CreateOrder } from '../types/order.types';

export class OrderService {
    private repository = new OrderRepository();
    private racketRepository = new RacketRepository();

    async createOrder(order: CreateOrder) {

        return prisma.$transaction(
            async tx => {

                let total = 0;

                for (const item of order.items) {

                    const racket =
                        await tx.racket.findUnique({
                            where: {
                                id: item.racketId
                            }
                        });

                    if (!racket) {
                        throw new Error(
                            `Racket ${item.racketId} not found`
                        );
                    }

                    if (
                        racket.stock <
                        item.quantity
                    ) {
                        throw new Error(
                            `Only ${racket.stock} units available for ${racket.name}`
                        );
                    }

                    total +=
                        racket.price *
                        item.quantity;
                }

                const createdOrder =
                    await tx.order.create({
                        data: {
                            customerName:
                                order.customerName,

                            email:
                                order.email,

                            paymentMethod:
                                order.paymentMethod,

                            total,

                            items: {
                                create:
                                    order.items
                            }
                        },

                        include: {
                            items: true
                        }
                    });

                for (const item of order.items) {

                    await tx.racket.update({
                        where: {
                            id: item.racketId
                        },

                        data: {
                            stock: {
                                decrement:
                                    item.quantity
                            }
                        }
                    });
                }

                return createdOrder;
            }
        );
    }
}