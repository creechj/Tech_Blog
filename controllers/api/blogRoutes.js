const router = require("express").Router();
const { User } = require("../../models");
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

// route for dasboard with user's posts available to edit/delete
router.get("/", async (req, res) => {
  try {
    const userPosts = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = userPosts.map((post) => post.get({ plain: true }));
    // res.render('dashboard', {
    //     posts,
    // });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "No blog posts yet. Add a post!" });
    return;
  }
});

// create blog post route
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      blog_title: req.body.blog_title,
      blog_body: req.body.blog_body,
      user_id: req.body.user_id,
    });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete blog post route
router.delete('/', async (req, res) => {
    try {
        const blogPost = await Blog.destroy({
            where: {
                id: req.body.id,
            },
        });
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
