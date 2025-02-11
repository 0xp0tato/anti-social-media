import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI, {});
});

beforeEach(async () => {
    const collections = (await mongoose.connection.db?.collections()) || [];
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
});
