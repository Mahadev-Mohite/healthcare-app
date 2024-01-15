const {Router} = require('express');
const User = require('../models/user');

const router = Router();

router.get("/signin",(req,res) =>{
    const user = req.user;
    return res.render("signin",{user})
})
router.get("/signup",(req,res) =>{
    const user = req.user;
    return res.render("signup",{user})
})
router.post('/signin',async(req,res) =>{
     try{
    const {email, password} = req.body;
     const token =await User.matchPasswordAndGenerateToken(email, password);

     console.log('token',token);
     return res.cookie('token',token).redirect("/")


     }catch (error){
        return res.render('signin',{
            error: "Incorrect Email or Password",
        });
     }
});
router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/signin");
});


router.post("/signup", async (req,res) =>{
    const {fullName, email, password } =req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");

});

module.exports = router;