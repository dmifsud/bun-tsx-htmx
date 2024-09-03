import * as mongoose from 'mongoose';
import { Todo } from '../../models/todo.model';


type TodoDocument = {
    getBaseModel: () => Todo;
}

const todoSchema = new mongoose.Schema<Todo & TodoDocument>(
  {
    task: {type: String, required: true},
    done: {type: Boolean, required: true},
  },
  {
    timestamps: true,
    methods: {
      getBaseModel(): Todo {
        return {
            id: this._id.toString(),
            task: this.task,
            done: this.done,
        }
      }
    },
  }
);

export type TodoSchema = mongoose.InferSchemaType<typeof todoSchema>;
export const TodoSchemaModel = mongoose.model('todos', todoSchema);