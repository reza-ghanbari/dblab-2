import { Injectable } from '@nestjs/common';
import GenreEntity from 'src/db/genre.entity';
import CreateGenreDto from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  async insert(genre: CreateGenreDto): Promise<GenreEntity> {
    const genreEntity = GenreEntity.create();
    const { type } = genre;
    genreEntity.type = type;
    return await GenreEntity.save(genreEntity);
  }

  async getAll(): Promise<GenreEntity[]> {
    return await GenreEntity.find();
  }
}
