import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * A PrismaClient instance that is used to interact with the database.
 */
const database = new PrismaClient();

/**
 * A service that provides functionality for managing tasks.
 */
@Injectable()
export class TasksService {
    /**
     * Returns a list of tasks for a given user.
     *
     * @param userId - The ID of the user for which to retrieve tasks.
     * @returns An array of tasks for the specified user.
     */
    getTasks(userId: number) {
        return database.task.findMany({
            where: {
                userId: userId
            },
        }).then((tasks) => {
            return tasks.map((task) => {
                return {
                    userId: task.userId,
                    id: task.id,
                    description: task.content,
                    completed: task.completed
                };
            });
        });
    }

    /**
     * Creates a new task for a given user.
     *
     * @param userId - The ID of the user for whom to create the task.
     * @param content - The content of the task.
     * @returns The newly created task.
     */
    createTask(userId: number, content: string) {
        return database.task.create({
            data: {
                userId: userId,
                content: content
            }
        });
    }

    /**
     * Updates an existing task.
     *
     * @param taskId - The ID of the task to update.
     * @param content - The updated content of the task.
     * @returns The updated task.
     */
    updateTask(taskId: number, content: any) {
        return database.task.update({
            where: {
                id: taskId
            },
            data: {
                completed: content.completed || false,
                content: content.content
            }
        });
    }

    /**
     * Deletes an existing task.
     *
     * @param taskId - The ID of the task to delete.
     * @returns The deleted task.
     */
    deleteTask(taskId: number) {
        return database.task.delete({
            where: {
                id: taskId
            }
        });
    }
}

/**
 * Represents a task.
 */
export interface Task {
    userId: number;
    id: number;
    content: string;
    completed: boolean;
}