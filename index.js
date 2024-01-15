const path = require("path");
const express = require("express");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog')

const app = express();
const PORT = 8000;
mongoose.connect("mongodb://127.0.0.1:27017/healthcare").then(e => console.log("mongoDB Connected"));

const userRoute =require('./routes/user');
const blogRoute =require('./routes/blog');

const { checkForAuthenticationCookie } = require("./middleware/authentication");

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve(__dirname,"./public")))
// Assuming you have a route like this
app.get('/', async(req, res) => {
    const allBlogs = await Blog.find({});
     const user =req.user;
    // console.log(user)
    res.render('home', {
         user:req.user,
         blogs:allBlogs,
         }); // Pass the user data to the template
});

app.use('/user',userRoute)
app.use('/blog',blogRoute)

app.listen(PORT,() => console.log(`server started at PORT: ${PORT}`));
