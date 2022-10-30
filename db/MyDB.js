import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

function MyDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017";
  myDB.createUser = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("Diary").collection("users");
      const success = await users.findOne({user:user.user});
      if(success) {
        return false;
      }
      await users.insertOne(user);
      return true;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  myDB.authenticate = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("Diary").collection("users");
      const userInDb = await users.findOne({user:user.user});
      if(!userInDb) {
        return false;
      }
      return userInDb.password == user.password;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  myDB.listDiaries = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const diaries = client.db("Diary").collection("diaries");
      const res = await diaries.find({author:user.user}).toArray();
      return res;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  myDB.getDiary = async function (id = "") {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const diaries = client.db("Diary").collection("diaries");
      const res = await diaries.findOne({_id:ObjectId(id)});
      console.log(res);
      return res;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  myDB.deleteDiary = async function (id = "") {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const diaries = client.db("Diary").collection("diaries");
      const res = await diaries.deleteOne({_id:ObjectId(id)});
      console.log(res);
      return res;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  return myDB;
}

export default MyDB();
