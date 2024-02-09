import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Req, RawBodyRequest } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FastifyRequest } from 'fastify';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get(':userid')
    async getTasks(@Param('userid', ParseIntPipe) userid: number) {
        return this.tasksService.getTasks(userid);
    }

    @Post(':userid')
    async createTask(@Param('userid', ParseIntPipe) userid: number, @Req() req: RawBodyRequest<FastifyRequest>) {
        const content = req.body['content'];
        return this.tasksService.createTask(userid, content);
    }

    @Put(':taskid')
    async updateTask(@Param('taskid', ParseIntPipe) taskid: number, @Req() req: RawBodyRequest<FastifyRequest>) {
        const content = req.body;
        return this.tasksService.updateTask(taskid, content);
    }

    @Delete(':taskid')
    async deleteTask(@Param('taskid', ParseIntPipe) taskid: number) {
        return this.tasksService.deleteTask(taskid);
    }

}
