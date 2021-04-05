import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateGenreDto from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({ status: 200, description: 'creates new genre' })
  @ApiTags('genre')
  @Post('post')
  postGenre(@Body() genreDto: CreateGenreDto) {
    return this.genreService.insert(genreDto);
  }

  @ApiResponse({
    status: 200,
    description: 'get list of all genres',
    isArray: true,
  })
  @ApiTags('genre')
  @Get()
  getAllGenres() {
    return this.genreService.getAll();
  }
}
