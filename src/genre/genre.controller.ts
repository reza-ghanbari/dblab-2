import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @ApiResponse({
    status: 200,
    description:
      'if genre already exists, it will update that. otherwise it will create new one',
  })
  @ApiTags('genre')
  @Put(':id')
  updateGenre(
    @Body() genre: CreateGenreDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.genreService.updateGenre(genre, id);
  }

  @ApiResponse({
    status: 200,
    description: 'deletes genre id, if it exists',
  })
  @ApiTags('genre')
  @Delete(':id')
  deleteGenre(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.deleteGenre(id);
  }
}
