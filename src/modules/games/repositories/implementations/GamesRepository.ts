import { create } from 'node:domain';
import { createQueryBuilder, getConnection, getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
    .createQueryBuilder()
    .select()
    .where('title ILIKE :param', { param: `%${param}%` })
    .getMany();    

      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await createQueryBuilder("games").relation(Game, "users").of(id).loadMany();
    
      // Complete usando query builder
  }
}
