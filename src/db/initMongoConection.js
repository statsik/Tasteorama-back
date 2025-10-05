import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
    try {
        const user = String(getEnvVar("MONGODB_USER"));
        const pwd = String(getEnvVar("MONGODB_PASSWORD"));
        const url = String(getEnvVar("MONGODB_URL"));
        const db = String(getEnvVar("MONGODB_DB"));
        const uri = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log("Mongo connection successfully established!\n");
    } catch (err) {
        console.log('Error while setting up mongo connection', err);
        throw err;
    }
};
