import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OngModule } from './ong/ong.module';
import { WorkshopModule } from './workshop/workshop.module';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PresenceService } from './presence/presence.service';
import { PresenceModule } from './presence/presence.module';
import { ClassService } from './class/class.service';
import { ClassController } from './class/class.controller';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ong } from './ong/ong.entity';
import { workshop } from './workshop/workshop.entity';
import { category } from './category/category.entity';
import { student } from './student/student.entity';
import { StudentUpdateDTO } from './student/dto/studentUpdate.dto';
import { ClassroomController } from './classroom/classroom.controller';
import { ClassroomService } from './classroom/classroom.service';
import * as dotenv from 'dotenv'
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: 5432,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      entities: [ong, workshop, category, student, StudentUpdateDTO],
      synchronize: false, 
    }), OngModule, WorkshopModule, ClassroomModule, StudentModule, CategoryModule, UserModule, PresenceModule, ClassModule, TeacherModule],
  controllers: [AppController, ClassController, ClassroomController],
  providers: [AppService, ClassService, PresenceService, ClassroomService],
})
export class AppModule {}
