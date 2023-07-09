const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
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
        // res.render('homepage', {
        //     blogs,
        // });
        res.status(200).json(blogs);
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

module.exports = router;