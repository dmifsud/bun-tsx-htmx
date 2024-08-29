import * as mongoose from 'mongoose';
import { User } from "../../models/users.model";

type UserDocument = {
    speak: () => void;
    getBaseModel: () => User;
}

const userSchema = new mongoose.Schema<User & { password: string } & UserDocument>(
  {
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dob: {type: String, required: true },
    password: {type: String, required: true }
  },
  {
    methods: {
      speak() {
        console.log(`My name is ${this.name}!`);
      },
      getBaseModel(): User {
        return {
            id: this._id.toString(),
            name: this.name,
            surname: this.surname,
            email: this.email,
            dob: this.dob
        }
      }
    },
  }
);

export type UserSchema = mongoose.InferSchemaType<typeof userSchema>;
export const UserSchemaModel = mongoose.model('User', userSchema);
