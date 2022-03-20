import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    // See if email is in use
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException();
    }

    // Hash the Users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = scryptSync(password, salt, 32);

    // Join the hashed result and the salt together
    const hashPassword = salt + '.' + hash.toString('hex');

    // Create a new User and save it
    const User = this.repo.create({
      email: email,
      hashPassword: hashPassword,
    });

    // return the User
    return this.repo.save(User);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  async find(email: string) {
    return this.repo.find({ email });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }

    const [salt, storedHash] = user.hashPassword.split('.');

    const hash = scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException();
    }

    return user;
  }
}
