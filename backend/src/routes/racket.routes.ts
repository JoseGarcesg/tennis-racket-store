import { Router } from 'express';

import { RacketController }
    from '../controllers/racket.controller';

const router = Router();

const controller =
    new RacketController();

router.get(
    '/',
    controller.getAll
);

export default router;