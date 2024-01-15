const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination relative to the project directory
        cb(null, path.resolve(__dirname, '../public/uploads/'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    const user = req.user;
    return res.render("addBlog", { user });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, body, time } = req.body;

        const blog = await Blog.create({
            body,
            title,
            time,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.filename}`
        });

        console.log(`Redirecting to /blog/${blog._id}`);
        return res.redirect(`./`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
