const mongoose = require('mongoose');

const dburl = "mongodb+srv://Admin:uxf7tOzFuKVZgBK9@cluster0.t7ddp.mongodb.net/Test?retryWrites=true&w=majority";

mongoose.set("strictQuery",true, "useCreateIndex", true);

const connection = async () => {
    try {
        await mongoose.connect(dburl);
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error.message);
        process.exit();
    }
};

module.exports = connection;