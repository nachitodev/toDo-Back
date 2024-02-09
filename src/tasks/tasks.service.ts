import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const database = new PrismaClient();

@Injectable()
export class TasksService {
    getTasks(userId: number) {
        return database.task.findMany({
            where: {
                userId: userId
            },
        }).then((tasks) => {
            return tasks.map(task => {
                return {
                    userid: task.userId,
                    id: task.id,
                    description: task.content,
                    completed: task.completed
                }
            })
        })
    }

    createTask(userid: number, content: any) {
        return database.task.create({
            data: {
                userId: userid,
                content: content
            }
        })
    }

    updateTask(taskid: number, content: any) {
        return database.task.update({
            where: {
                id: taskid
            },
            data: {
                completed: content["completed"] || false,
                content: content["content"]
            }
        })
    }

    deleteTask(taskid: number) {
        return database.task.delete({
            where: {
                id: taskid
            }
        })
    }
}
