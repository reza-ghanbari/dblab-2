import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import ProjectEntity from './db/project.enity';
import CustomerEntity from './db/customer.entity';

@Module({
  imports: [
    HelloModule,
    BooksModule,
    GenreModule,
    UserModule,
    JobseekersModule,
    TypeOrmModule.forFeature([CustomerEntity, ProjectEntity]),
    TypeOrmModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
