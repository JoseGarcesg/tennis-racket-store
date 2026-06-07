import { RacketRepository } from '../repositories/racket.repository';

export class RacketService {

    private repository =
        new RacketRepository();

    async getAllRackets() {
        return this.repository.findAll();
    }
}