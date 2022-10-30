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

router.get("/updateUser", async (req, res) => {
    console.log("updateUser");
});

router.get("/listDiaries", async (req, res) => {
    console.log("listDiaries");
    const diaries = await myDB.listDiaries(req.session.user);
    res.json(diaries);
});

router.get("/createDiary", async (req, res) => {
    console.log("createDiary");
});

router.get("/updateDiary", async (req, res) => {
    console.log("updateDiary");
});

router.get("/deleteDiary", async (req, res) => {
    console.log("deleteDiary");
});

router.get("/getDiary", async (req, res) => {
    console.log("getDiary");
    console.log(req.query.id);
    const diary = await myDB.getDiary(req.query.id);
    res.json(diary);
});

export default router;
