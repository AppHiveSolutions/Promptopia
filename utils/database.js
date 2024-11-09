import mongoose from 'mongoose';
let dbConnected = false; //Track the Connection to DB

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (dbConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'share_prompt',
        });

        console.log("DB CONECTED")
        dbConnected = true;

    } catch (error) {
        console.error(error)
    }

}


