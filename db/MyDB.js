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
  myDB.getUser = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("Diary").collection("users");
      const res = await users.findOne({user:user.user});
      return res;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  myDB.updateProfile = async function (user = {}, profile = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("Diary").collection("users");
      console.log("user " + user);
      console.log(profile);
      const res = await users.updateOne({user:user.user}, {$set:{location:profile.location, hobby:profile.hobby}});
      return res;
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
  myDB.createDiary = async function (entry = {}, user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const diaries = client.db("Diary").collection("diaries");
      const res = await diaries.insertOne({author:user.user, title:entry.title, content:entry.content});
      //console.log(res);
      return res;
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
  myDB.editDiary = async function (id = "", entry = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const diaries = client.db("Diary").collection("diaries");
      const res = await diaries.update({_id:ObjectId(id)}, {$set:{content:entry.content}});
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
      return res;
    } finally {
      console.log("Diary: Closing db connection");
      client.close();
    }
  };
  return myDB;
}

export default MyDB();
