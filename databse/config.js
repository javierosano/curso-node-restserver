import mongoose from "mongoose";


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de datos Online');

    } catch (error) {
        console.log(error);

        throw new Error('Error conección base de datos')
    }
};


export default dbConnection;