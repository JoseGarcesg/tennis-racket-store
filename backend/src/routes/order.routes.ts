import { Router } from 'express';

import { OrderController } from '../controllers/order.controller';

const router = Router();
const controller = new OrderController();

router.post('/', (req, res) =>
    controller.create(req, res)
);

export default router;