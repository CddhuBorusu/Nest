import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.repo.findOne({ where: { username: dto.username } });
    if (existing) throw new ConflictException('Username already taken');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ username: dto.username, passwordHash });
    const saved = await this.repo.save(user);
    const { passwordHash: _, ...stripped } = saved;
    return stripped;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { passwordHash: _, ...stripped } = user;
    return stripped;
  }
}

