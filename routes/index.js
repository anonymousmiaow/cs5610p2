import express from "express";
import myDB from "../db/MyDB.js";

const router = express.Router();

router.get("/getCurrentUser", (req, res) => {
  console.log("getCurrentUser", req.session);
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user,
  });
});

router.post("/authenticate", async (req, res) => {
  // TODO: validate that the user data is correct
  const user = req.body;
  const success = await myDB.authenticate(user);
  if (success) {
    req.session.user = { user: user.user };
    res.json({ isLoggedIn: true, err: null });
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong User or Password" });
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.json({ isLoggedIn: false, msg: "Logout successful" });
});

router.post("/signup", async (req, res) => {
  // Save user to db
  const user = req.body;
  const success = await myDB.createUser(user);
  if(!success) {
    res.json({ isLoggedIn: false, err: "User alreay exists" });
    return;
  }
  req.session.user = { user: user.user };
  res.json({ isLoggedIn: true, err: null });
});

router.get("/getUser", async (req, res) => {
    console.log("getUser");
    console.log(req);
    const user = await myDB.getUser(req.session.user);
    res.json(user);
});

router.post("/updateProfile", async (req, res) => {
  console.log("updateProfile");
  console.log(req.body);
  const diary = await myDB.updateProfile(req.session.user, req.body);
  res.json({msg: "Profile updated" });
});

router.get("/listDiaries", async (req, res) => {
    const diaries = await myDB.listDiaries(req.session.user);
    res.json(diaries);
});

router.post("/createDiary", async (req, res) => {
    console.log("createDiary");
    console.log(req.body);
    await myDB.createDiary(req.body, req.session.user);
    res.json({msg: "Diary saved" });
});

router.post("/editDiary", async (req, res) => {
    console.log("updateDiary");
    const diary = await myDB.editDiary(req.query.id, req.body);
    res.json({msg: "Diary updated" });
});

router.get("/deleteDiary", async (req, res) => {
    console.log("deleteDiary");
    console.log(req.query.id);
    const diary = await myDB.deleteDiary(req.query.id);
    res.json({msg: "Diary deleted" });
});

router.get("/getDiary", async (req, res) => {
    console.log("getDiary");
    console.log(req.query.id);
    const diary = await myDB.getDiary(req.query.id);
    res.json(diary);
});

export default router;
