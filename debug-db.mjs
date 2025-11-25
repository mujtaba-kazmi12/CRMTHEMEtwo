import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
console.log('Connecting to:', MONGODB_URI?.replace(/:([^:@]+)@/, ':****@'));

async function run() {
    try {
        await mongoose.connect(MONGODB_URI, { authSource: 'admin' });
        console.log('Connected successfully.');

        const db = mongoose.connection.db;

        // List collections
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        // Check Categories specifically
        const collectionName = 'Categories';
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`Count in '${collectionName}':`, count);

        const docs = await collection.find({}).toArray();
        console.log('Documents:', JSON.stringify(docs, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
