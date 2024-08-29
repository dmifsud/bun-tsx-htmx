import { ObjectId } from "mongodb";
import { UserSchemaModel } from "../db/schemas/users";
import { User } from "../models/users.model";


export const fakeUsersDb: User[] = [
    {
        id: '1',
        email: 'joe@doe.com',
        name: 'Joe',
        surname: 'Doe',
        dob: '1990-01-01',
    },
    {
        id: '2',
        email: 'jane.smith@example.com',
        name: 'Jane',
        surname: 'Smith',
        dob: '1985-07-12',
    },
    {
        id: '3',
        email: 'michael.brown@example.com',
        name: 'Michael',
        surname: 'Brown',
        dob: '1992-03-08',
    },
    {
        id: '4',
        email: 'emily.jones@example.com',
        name: 'Emily',
        surname: 'Jones',
        dob: '1988-11-16',
    },
    {
        id: '5',
        email: 'david@mifsud.com',
        name: 'David',
        surname: 'Mifsud',
        dob: '1989-04-05',
    },
];

export class AuthenticationService {

    public fakeToken: string | undefined;
    private fakeAuthenticatedUserId: ObjectId | undefined;

    async login(email: string, _password: string, _remember: boolean) {

        try {
            const user = await UserSchemaModel.findOne({ email });
            if (user) {
                this.fakeAuthenticatedUserId = user._id;
                this.fakeToken = Date.now().toString();
            }
            return user;
          } catch (ex) {
            console.dir(ex);
          }

        // const user = fakeUsersDb.find(u => u.email === email);
        
        // return new Promise<User>((resolve, reject) => {
        //     if (user) {
        //         this.fakeAuthenticatedUserId = user.id;
        //         this.fakeToken = Date.now().toString();

        //         resolve(user);
        //     } else {
        //         reject('User not found');
        //     }
        // });
    }
    
    async logout() {
        this.fakeToken = undefined;
        this.fakeAuthenticatedUserId = undefined;
        return new Promise<void>((resolve) => resolve());
    }

    async isAuthenticated(userId: string, token: string, rememberMe: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            // NOTE: once again for the sake of the demo this is done all in server memory with dodgy logic
            let bsonUserId: ObjectId | undefined;
            if (ObjectId.isValid(userId)) {
                bsonUserId = new ObjectId(userId);
            }
            if (rememberMe && bsonUserId) {
                this.fakeAuthenticatedUserId = bsonUserId;
                this.fakeToken = token;
            }
            resolve((bsonUserId && bsonUserId.equals(this.fakeAuthenticatedUserId) && token === this.fakeToken) ?? false);
        });
    }

    async getLoggedInUser(): Promise<User | undefined> {
        if (this.fakeAuthenticatedUserId && this.fakeToken) {
            const user = await UserSchemaModel.findById(this.fakeAuthenticatedUserId);
            if (user) {
                return user.getBaseModel();
            }
        }
    }
}

// NOTE: for the sake of a demo this is a simple in-memory store state
const authService = new AuthenticationService();
export default authService;