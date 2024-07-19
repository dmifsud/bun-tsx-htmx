import { User } from "../models/users.model";


const fakeUsersDb: User[] = [
    {
        id: 1,
        email: 'joe@doe.com',
        name: 'Joe',
        surname: 'Doe',
        dob: '1990-01-01',
    },
    {
        id: 2,
        email: 'jane.smith@example.com',
        name: 'Jane',
        surname: 'Smith',
        dob: '1985-07-12',
    },
    {
        id: 3,
        email: 'michael.brown@example.com',
        name: 'Michael',
        surname: 'Brown',
        dob: '1992-03-08',
    },
    {
        id: 4,
        email: 'emily.jones@example.com',
        name: 'Emily',
        surname: 'Jones',
        dob: '1988-11-16',
    },
    {
        id: 5,
        email: 'david.wilson@example.com',
        name: 'David',
        surname: 'Wilson',
        dob: '1990-05-24',
    },
];

export class AuthenticationService {

    public fakeToken: string | undefined;
    private fakeAuthenticatedUserId: number | undefined;

    async login(email: string, _password: string) {

        const user = fakeUsersDb.find(u => u.email === email);
        
        return new Promise<User>((resolve, reject) => {
            if (user) {
                this.fakeAuthenticatedUserId = user.id;
                this.fakeToken = Date.now().toString();
                resolve(user);
            } else {
                reject('User not found');
            }
        });
    }
    
    async logout() {
        this.fakeToken = undefined;
        this.fakeAuthenticatedUserId = undefined;
        return new Promise<void>((resolve) => resolve());
    }

    async isAuthenticated(userId: number, token: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(userId === this.fakeAuthenticatedUserId && token === this.fakeToken);
        });
    }
}