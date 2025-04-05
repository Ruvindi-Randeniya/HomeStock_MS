const mongoose = require("mongoose")

const dburl = "mongodb+srv://Admin:uxf7tOzFuKVZgBK9@cluster0.t7ddp.mongodb.net/Test?retryWrites=true&w=majority";

mongoose.set("strictQuery", true, "useNewUrlParser", true)

const connection = async () => {
    try{
        await mongoose.connect(dburl)
        console.log("MongoDB Connected~")
    }catch(e){
        console.error(e.message)
        process.exit()
    }
}

module.exports = connection