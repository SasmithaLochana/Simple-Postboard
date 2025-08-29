import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
const posts = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

app.get("/posts/:id", (req, res) => {
  const post = posts[req.params.id];

  if (post) {
    res.render("post.ejs", { post, id: req.params.id });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit-post", (req, res) => {
  const post = posts[req.params.id];

  if (post) {
    res.render("edit-post.ejs", { post, id: req.params.id });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/about-me", (req, res) => {
  res.render("about-me.ejs");
});

app.post("/posts/:id/edit-post", (req, res) => {
  const id = req.params.id;
  const { title, message } = req.body;

  if (posts[id]) {
    posts[id] = { title, message };
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/posts/:id/delete", (req, res) => {
  const id = req.params.id;
  if (posts[id]) {
    posts.splice(id, 1);
  }
  res.redirect("/");
});

app.post("/create-post", (req, res) => {
  const { title, message } = req.body;
  if (posts.length >= 10) {
    return res.render("index.ejs", { posts, error: "You can't add more than 10 posts. Please delete some and try again." });
  }
  posts.push({ title, message });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
