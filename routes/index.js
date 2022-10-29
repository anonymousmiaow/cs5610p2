import express from "express";
//import myDB from "../db/MyMongoDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to your blog!" });
});

// router.get("/getQuakes", async (req, res) => {
//   console.log("params", req.query);
//   const page = req.query.page || 0;
//   //const quakes = await myDB.getQuakes({}, page);
//   res.json("my website");
// });

export default router;
