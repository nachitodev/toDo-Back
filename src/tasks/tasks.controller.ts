import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Req, RawBodyRequest } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FastifyRequest } from 'fastify';

/**
 * The TasksController class handles requests to the /tasks endpoint.
 */
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    /**
     * Returns a list of tasks for a given user.
     * @param userid The ID of the user for whom to retrieve tasks.
     */
    @Get(':userid')
    async getTasks(@Param('userid', ParseIntPipe) userid: number) {
        return this.tasksService.getTasks(userid);
    }
    /**
     * Creates a new task for a given user.
     * @param userid The ID of the user for whom to create the task.
     * @param req The request object, containing the task content in the request body.
     */
    @Post(':userid')
    async createTask(@Param('userid', ParseIntPipe) userid: number, @Req() req: RawBodyRequest<FastifyRequest>) {
        const content = req.body['content'];
        return this.tasksService.createTask(userid, content);
    }
    /**
     * Updates an existing task.
     * @param taskid The ID of the task to update.
     * @param req The request object, containing the updated task content in the request body.
     */
    @Put(':taskid')
    async updateTask(@Param('taskid', ParseIntPipe) taskid: number, @Req() req: RawBodyRequest<FastifyRequest>) {
        const content = req.body;
        return this.tasksService.updateTask(taskid, content);
    }

    /**
    * Deletes an existing task.
    * @param taskid The ID of the task to delete.
    */
    @Delete(':taskid')
    async deleteTask(@Param('taskid', ParseIntPipe) taskid: number) {
        return this.tasksService.deleteTask(taskid);
    }

}
