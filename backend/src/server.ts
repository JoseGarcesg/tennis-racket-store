import express from 'express';
import cors from 'cors';

import racketRoutes from './routes/racket.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    '/api/rackets',
    racketRoutes
);

app.use(
    '/api/orders',
    orderRoutes
);

app.get(
    '/api/health',
    (_, res) => {

        res.json({
            message:
                'API running'
        });
    }
);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});