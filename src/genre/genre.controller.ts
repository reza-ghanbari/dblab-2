import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import CreateGenreDto from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({ status: 200, description: 'creates new genre' })
  @ApiTags('genre')
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteGenre(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.deleteGenre(id);
  }
}
