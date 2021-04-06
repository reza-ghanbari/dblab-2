import { Injectable } from '@nestjs/common';
import GenreEntity from 'src/db/genre.entity';
import { DeleteResult } from 'typeorm';
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

  async updateGenre(genre: CreateGenreDto, id: number): Promise<GenreEntity> {
    const genreEntity = GenreEntity.create({
      type: genre.type,
      id: id,
    });
    return await GenreEntity.save(genreEntity);
  }

  async deleteGenre(id: number): Promise<DeleteResult> {
    return await GenreEntity.delete(id);
  }

  async getGenres(genreIds: number[]): Promise<GenreEntity[]> {
    const genres: GenreEntity[] = [];
    if (!genreIds) return genres;
    for (const id of genreIds) {
      genres.push(await GenreEntity.findOne(id));
    }
    return genres;
  }
}
