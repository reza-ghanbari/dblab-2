import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiResponse({
    status: 200,
    description: 'get list of all projects',
    isArray: true,
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getProjects() {
    return this.projectService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'get project by id',
  })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getProjectWithId(@Param('id') id: number) {
    return this.projectService.get(id);
  }

  @ApiResponse({
    status: 200,
    description: 'get requests of project by id',
    isArray: true,
  })
  @Get(':id/requests')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getProjectRequests(@Param('id') id: number) {
    return this.projectService.getRequests(id);
  }

  @ApiResponse({
    status: 200,
    description: 'add request to project by id',
  })
  @Post(':id/requests')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  postProjectRequests(@Param('id') id: number, @Request() req) {
    return this.projectService.insertRequest(id, req.user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'update project by id',
  })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateProjectById(@Param('id') id: number, @Body() data: UpdateProjectDto) {
    return this.projectService.update(data, id);
  }

  @ApiResponse({
    status: 201,
    description: 'Add new project to current user',
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  addProject(@Body() projectData: CreateProjectDto, @Request() req) {
    return this.projectService.insert(projectData, req.user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete all projects of current user',
  })
  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteProjects() {
    return this.projectService.deleteAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Delete all projects of current user',
  })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteProjectWithId(@Param('id') id: number) {
    return this.projectService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete all requests of current project',
  })
  @Delete(':id/requests')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteRequestsWithId(@Param('id') id: number) {
    return this.projectService.deleteRequests(id);
  }
}
