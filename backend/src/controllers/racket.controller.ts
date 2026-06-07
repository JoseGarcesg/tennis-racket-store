import { Request, Response } from 'express';

import { RacketService } from '../services/racket.service';

export class RacketController {

    private service =
        new RacketService();

    getAll = async (
        _: Request,
        res: Response
    ) => {

        try {

            const rackets =
                await this.service
                    .getAllRackets();

            res
                .status(200)
                .json(rackets);

        } catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        'Internal server error'
                });
        }
    };
}