const express = require("express");
const cors = require("cors");
const app = express();
const { FILE_ROUTE } = require("./constants.js");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(FILE_ROUTE, express.static("images"));

const postsRouter = require("./routes/Posts");
const usersRouter = require("./routes/Users");

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(3001, () => {
  console.log("Server start on port 3001");
});
