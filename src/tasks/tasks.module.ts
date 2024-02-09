import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


/**
 * The TasksModule class is a NestJS module that contains the business logic for the tasks.
 */
@Module({
    imports: [],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule { }
