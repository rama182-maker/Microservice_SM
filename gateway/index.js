const express = require("express");
const app = express();
const PORT = 5001;
// const { requiresAuth } = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post.js");
const communityRouter = require("./community");

// app.use(requiresAuth);
app.use(express.json());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/community", communityRouter);

app.listen(PORT, () => {
  console.log(`server at ${PORT}`);
});