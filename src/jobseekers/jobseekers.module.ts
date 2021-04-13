import { Module } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { CustomerService } from './customer/customer.service';
import { ProjectController } from './project/project.controller';
import { CustomerController } from './customer/customer.controller';

@Module({
  providers: [ProjectService, CustomerService],
  controllers: [ProjectController, CustomerController],
  exports: [CustomerService],
})
export class JobseekersModule {}
