import express from "express";
const router = express.Router();
//import myDB from "../db/MyMongoDB.js";

router.get("/getCurrentUser", (req, res) => {
  console.log("getCurrentUser", req.session);
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user,
  });
});

router.post("/authenticate", (req, res) => {
  // TODO: validate that the user data is correct
  const user = req.body;

  // TODO: validate on Mongo the user credentials
  if (user.user === "k" && user.password == "1") {
    req.session.user = { user: user.user };

    res.json({ isLoggedIn: true, err: null });
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong User or Password" });
  }
});

router.get("/createUser", async (req, res) => {
    console.log("createUser");
});

router.get("/updateUser", async (req, res) => {
    console.log("updateUser");
});

router.get("/listDiaries", async (req, res) => {
    console.log("listDiaries");
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

export default router;
