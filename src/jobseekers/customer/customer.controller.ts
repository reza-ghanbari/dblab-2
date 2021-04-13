import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Body, Controller, Post, Query, Get, UseGuards, Delete, Param } from '@nestjs/common';
import CreateCustomerDto from './dto/create-customer.dto';

@ApiTags('customer')
@Controller('users')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiResponse({ status: 201, description: 'register a new customer' })
  @Post()
  postCustomer(
    @Body() customer: CreateCustomerDto,
    @Query('type') type: 'freelancer' | 'owner',
  ) {
    customer.type = type;
    return this.customerService.insert(customer);
  }

  @ApiResponse({
    status: 200,
    description: 'get all customers of a type',
    isArray: true,
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getCustomers(@Query('type') type: 'freelancer' | 'owner') {
    return this.customerService.getAll(type);
  }

  @ApiResponse({
    status: 200,
    description: 'delete all customers of a type',
  })
  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteAll(@Query('type') type: 'freelancer' | 'owner') {
    return this.customerService.deleteAll(type);
  }

  @ApiResponse({
    status: 200,
    description: 'get all projects of a user',
    isArray: true,
  })
  @Get(':id/projects')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getUserProjects(@Param('id') id: number) {
    return this.customerService.getProjects(id);
  }

  @ApiResponse({
    status: 200,
    description: 'delete all projects of a customer(the ones that they own)',
  })
  @Delete(':id/projects')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteAllProjects(@Param('id') id: number) {
    return this.customerService.deleteAllProjects(id);
  }
}
