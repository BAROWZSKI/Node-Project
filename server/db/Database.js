const mongoose = require("mongoose");
const UserModel = require("../models/User");
const BookModel = require("../models/Books");

class Database{
    static instance;

    constructor(){
        if(Database.instance){
            this.mongoConnection = null;
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect(options){
        if (this.mongoConnection) {
            console.log("Zaten veritabanina bağli.");
            return;
        }

        try{
            console.log("db connecting");
            let db = await mongoose.connect(options.CONNECTION_STRING);
            this.mongoConnection = db;
            console.log("db connected");
        }catch(err){
            console.log(err);
            process.exit(1);
        }
    }

    get models(){
        return {
            User : UserModel,
            Book : BookModel
        };
    }
}

module.exports = new Database();