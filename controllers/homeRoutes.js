const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPost = await Blog.findAll({});
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

module.exports = router;