const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')

const app = express();
const blogRoutes = require('./src/routes/blog');
const authRoutes = require('./src/routes/auth');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFillter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParse.json());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage, fileFilter: fileFillter }).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1/blog', blogRoutes);
app.use('/v1/auth', authRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data,
    })
})

mongoose.connect('mongodb+srv://ilham:ilham@cluster0.nkzuf.mongodb.net/MERN-BLOG?retryWrites=true&w=majority')
    .then(() => {
        app.listen(4000, () => console.log('Connection Success'));
    })
    .catch(err => console.log(err));

