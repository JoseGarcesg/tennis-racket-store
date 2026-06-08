import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {

    private service = new OrderService();

    async create(req: Request, res: Response) {
        try {
            const order = await this.service.createOrder(
                req.body
            );

            return res.status(201).json(order);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message:
                    'Could not create order'
            });
        }
    }
}