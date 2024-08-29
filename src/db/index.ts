import * as mongoose from 'mongoose';

export class OnlineLearningDB {

    async connect() {
        if (process.env.DB_USER && process.env.DB_PASS) {
            await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n2xqh.mongodb.net/online_learning_db?retryWrites=true&w=majority&appName=Cluster0`);
        } else {
            throw Error('Environment variables missing for DB connection');
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}