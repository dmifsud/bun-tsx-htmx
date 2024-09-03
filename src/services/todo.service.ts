import { ObjectId } from "mongodb";
import { TodoSchemaModel } from "../db/schemas/todo";
import { Todo } from "../models/todo.model";


export class TodoService {
    async getAllTodos(): Promise<Todo[]> {
        const todos = await TodoSchemaModel.find().sort({ createdAt: -1 });
        console.log('todos found', todos);
        return todos.map(todo => todo.getBaseModel());
    }

    async getTodoById(id: string): Promise<Todo | undefined> {
        const todo = await TodoSchemaModel.findById(new ObjectId(id));
        if (todo) {
            return todo.getBaseModel();
        }
    }

    async addTodo(taskName: string) {
        const todoCreated = await TodoSchemaModel.create({
            task: taskName,
            done: false
        });
        return todoCreated.getBaseModel();
    }

    async patchTodo(id: string, patchData: Partial<Pick<Todo, 'task' | 'done'>>) {
        const updatedTodo = await TodoSchemaModel.findByIdAndUpdate(
            id,
            patchData,
            { new: true }
          );
          return updatedTodo?.getBaseModel();
    }

    async updateTodoTask(id: string, task: string) {
        const updatedTodo = await TodoSchemaModel.findByIdAndUpdate(
            id,
            { 
                task
            },
            { new: true }
          );
          return updatedTodo?.getBaseModel();
    }

    async deleteTodo(id: string) {
        await TodoSchemaModel.findByIdAndDelete(new ObjectId(id));
    }
    
}