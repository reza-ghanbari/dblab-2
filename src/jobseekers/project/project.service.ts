import { Injectable } from '@nestjs/common';
import CustomerEntity from 'src/db/customer.entity';
import ProjectEntity from 'src/db/project.enity';
import { DeleteResult, getConnection, In } from 'typeorm';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  async insert(
    projectDto: CreateProjectDto,
    ownerId: number,
  ): Promise<ProjectEntity> {
    const project: ProjectEntity = ProjectEntity.create({});
    const { name, description, budget, deadline } = projectDto;
    project.owner = await CustomerEntity.findOne({ where: { id: ownerId } });
    project.budget = budget;
    project.name = name;
    project.description = description;
    project.deadline = deadline;
    return await ProjectEntity.save(project);
  }

  async get(projectId: number): Promise<ProjectEntity> {
    return await ProjectEntity.findOne({ where: { id: projectId } });
  }

  async getAll(): Promise<ProjectEntity[]> {
    return await ProjectEntity.find();
  }

  async update(
    projectDto: UpdateProjectDto,
    projectId: number,
  ): Promise<ProjectEntity> {
    let project = await ProjectEntity.findOne({ where: { id: projectId } });
    const requests: CustomerEntity[] = await CustomerEntity.find({
      id: In(projectDto?.requests),
    });
    // for (const request of projectDto?.requests)
    //   requests.push(await CustomerEntity.findOne({ where: {id: request} }));
    if (project) {
      project.owner =
        (await CustomerEntity.findOne({ where: { id: projectDto.owner } })) ??
        project.owner;
      project.budget = projectDto.budget ?? project.budget;
      project.name = projectDto.name ?? project.name;
      project.description = projectDto.description ?? project.description;
      project.deadline = projectDto.deadline ?? project.deadline;
      project.requests = requests ?? project.requests;
    } else {
      project = ProjectEntity.create({
        id: projectId,
        name: projectDto.name,
        description: projectDto.description,
        deadline: projectDto.deadline,
        budget: projectDto.budget,
        owner: await CustomerEntity.findOne({
          where: { id: projectDto.owner },
        }),
        requests: requests,
      });
    }
    await ProjectEntity.save(project);
    return project;
  }

  async delete(projectId: number): Promise<DeleteResult> {
    return await ProjectEntity.delete(projectId);
  }

  async deleteAll(): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ProjectEntity).execute();
  }

  async getRequests(projectId: number): Promise<CustomerEntity[]> {
    const project: ProjectEntity = await ProjectEntity.findOne({
      where: { id: projectId },
      relations: ['requests'],
    });
    return project.requests;
  }

  async insertRequest(
    projectId: number,
    userId: number,
  ): Promise<CustomerEntity> {
    const customer: CustomerEntity = await CustomerEntity.findOne({
      where: { id: userId },
    });
    const project: ProjectEntity = await ProjectEntity.findOne({
      where: { id: projectId },
      relations: ['requests'],
    });
    if (customer) project.requests.push(customer);
    await ProjectEntity.save(project);
    return customer;
  }

  async deleteRequests(projectId: number) {
    const project: ProjectEntity = await ProjectEntity.findOne({
      where: { id: projectId },
      relations: ['requests'],
    });
    project.requests = [];
    await ProjectEntity.save(project);
  }
}
