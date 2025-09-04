import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
  ) {}

  async create(dto: CreatePostDto) {
    const post = this.repo.create(dto);
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, dto);
    return this.repo.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.repo.remove(post);
    return { deleted: true };
  }
}

