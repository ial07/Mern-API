const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const blogController = require('../controllers/blog');


router.get('/posts', blogController.getAllBlog)

router.get('/post/:postId', blogController.getBlogById)

router.post('/post', [
    body('title').isLength({ min: 5 }).withMessage('Minimum Length 5 Characters!'),
    body('body').isLength({ min: 5 }).withMessage('Minimum Length 5 Characters!')
], blogController.createBlog)

router.put('/post/:postId', [
    body('title').isLength({ min: 5 }).withMessage('Minimum Length 5 Characters!'),
    body('body').isLength({ min: 5 }).withMessage('Minimum Length 5 Characters!')
], blogController.updateBlog)

router.delete('/post/:postId', blogController.deleteBlog)

module.exports = router;