import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  return res.send("CarWatch");
});

app.listen(5000, () => {
  console.log("server is listning on port 5000");
});
