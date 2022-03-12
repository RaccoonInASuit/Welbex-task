const express = require("express");
const router = express.Router();
const Post = require("../models").Post;
const upload = require("../middleware/file");
const{ getFilePath } = require("../utils/FileUtils");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  await Post.create(post);
  res.json(post);
});

router.get("/", async (req, res) => {
  const listOfPost = await Post.findAll();
  res.json(listOfPost);
});

router.put("/edit/:id", validateToken, async (req, res) => {
  const post = await Post.update({title: req.body.title, description: req.body.description}, {where: {id: req.params.id}});
  res.json(post);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  res.json(post);
});

router.delete("/:id", validateToken, async (req, res) => {
  const post = await Post.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(post);
});

router.patch("/single/:id", validateToken, upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const image = req.file.filename;
  const post = await Post.findByPk(id);
  await post.update({file: image});
  const responseData = {...post.get({ plain: true }), file: getFilePath(post.file)};
  res.json(responseData);
});

module.exports = router;
