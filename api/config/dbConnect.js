const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
    try {

        const encoded_password = encodeURIComponent(process.env.DB_PASSWORD);
        const connect = await mongoose.connect(`mongodb+srv://saani:${encoded_password}@cluster0.p6w6h.mongodb.net/NGO-API?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = dbConnect;