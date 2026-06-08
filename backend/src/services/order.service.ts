import { OrderRepository } from '../repositories/order.repository';

import { CreateOrder } from '../types/order.types';

export class OrderService {
    private repository = new OrderRepository();

    async createOrder(order: CreateOrder) {
        return this
            .repository
            .create(order);
    }
}