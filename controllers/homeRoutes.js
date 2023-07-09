const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPost = await Blog.findAll({
          include: {
             model: User, 
             attributes: ['username']
          }
        });
        const blogs = blogPost.map((blog) => blog.get({ plain: true}));
        res.render('homepage', {
            blogs,
        });
        // res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'No blog posts yet. Login or signup to create a post.'});
        return;
    }
})

// redirect for login route if user already logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

// route for dasboard with user's posts available to edit/delete
router.get("/dashboard", async (req, res) => {
  try {
    const userPosts = await Blog.findAll({
      where: {
        user_id: 2,
      },
      include: {
        model: User, 
        attributes: ['username']
     }
    });
    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
        posts,
    });
    // res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "No blog posts yet. Add a post!" });
    return;
  }
});

// create blog post route
router.post("/dashboard", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      blog_title: req.body.blog_title,
      blog_body: req.body.blog_body,
      user_id: req.session.user_id,
    });
    res.redirect("/dashboard");
    // res.status(200).json({ message: "Post created" })
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete blog post route
router.delete("/dashboard", async (req, res) => {
  try {
    const blogPost = await Blog.destroy({
      where: {
        id: req.body.id,
      },
    });
    // res.status(200).json({ message: "Post deleted" });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit blog post route
router.put("/dashboard", async (req, res) => {
  try {
    const blogPost = await Blog.update(
      {
        blog_title: req.body.blog_title,
        blog_body: req.body.blog_body,
      },
      {
        where: { id: req.body.id },
      }
    );
    // res.status(200).json({ message: "Post Updated" });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;