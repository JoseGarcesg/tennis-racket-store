import { prisma } from '../config/prisma';

import { CreateOrder } from '../types/order.types';

export class OrderRepository {

    async create(order: CreateOrder) {
        const total = order.items.reduce((sum, item) =>
            sum + (item.price * item.quantity)
            , 0);

        return prisma.order.create({
            data: {
                customerName: order.customerName,
                email: order.email,
                paymentMethod: order.paymentMethod,
                total,
                items: {
                    create: order.items.map(item => ({
                        racketId: item.racketId,
                        quantity: item.quantity,
                        price: item.price
                    })
                    )
                }
            },
            include: {
                items: true
            }
        });
    }
}