import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';

import { User } from './user.entity';

export type UpdateUserAttributes = Partial<
  Omit<
    User,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'hashPassword'
    | 'logInsert'
    | 'logRemove'
    | 'logUpdate'
  >
>;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    // See if email is in use
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new NotFoundException();
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = scryptSync(password, salt, 32);

    // Join the hashed result and the salt together
    const hashPassword = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = this.repo.create({
      email: email,
      hashPassword: hashPassword,
    });

    // return the user
    return await this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({
      where: {
        email: email,
      },
    });
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
    email?: string;
  }): Promise<[User[], number]> {
    let query = this.repo
      .createQueryBuilder('user')
      .orderBy('created_at', 'DESC')
      .where('1=1');

    if (options.name) {
      query = query.andWhere('name = :emnameil', { name: options.name });
    }

    if (options.email) {
      query = query.andWhere('email = :email', { email: options.email });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return query.getManyAndCount();
  }

  async update(id: number, attrs: UpdateUserAttributes) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (attrs.email) {
      user = await this.findOneByEmail(attrs.email);
      if (user && user.id !== id) {
        throw new ConflictException();
      }
    }
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.repo.remove(user);
  }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const [salt, storedHash] = user.hashPassword.split('.');

    const hash = scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException();
    }

    return user;
  }
}
