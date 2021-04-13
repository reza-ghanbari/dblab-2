import ProjectEntity from 'src/db/project.enity';
import { Injectable } from '@nestjs/common';
import CustomerEntity from 'src/db/customer.entity';
import { getConnection } from 'typeorm';
import CreateCustomerDto from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  async getAll(type: 'freelancer' | 'owner'): Promise<CustomerEntity[]> {
    return await CustomerEntity.find({ where: { type: type } });
  }

  async getByName(username: string): Promise<CustomerEntity> {
    const user = await CustomerEntity.findOne({
      where: { username: username },
    });
    return user;
  }

  async getProjects(id: number): Promise<ProjectEntity[]> {
    const user = await CustomerEntity.findOne({
      where: { id: id },
    });
    return user.submittedProjects;
  }

  async insert(customerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = CustomerEntity.create({});
    customer.username = customerDto.username;
    customer.password = customerDto.password;
    customer.rank = <number>customerDto.rank;
    customer.type = customerDto.type;
    customer.submittedProjects = [];
    return await CustomerEntity.save(customer);
  }

  async deleteAll(type: 'freelancer' | 'owner'): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CustomerEntity)
      .where({ type: type })
      .execute();
  }
  //! TODO: Do not forget to rediret add project to the ProjectController
  async deleteAllProjects(userId: number): Promise<CustomerEntity> {
    const customer = await CustomerEntity.findOne({ where: { id: userId } });
    customer.submittedProjects = [];
    return await CustomerEntity.save(customer);
  }
}
