const User = require('../models/user');


module.exports.renderRegisterForm = (req,res)=>{
    res.render('Users/register.ejs');
}

module.exports.registerUser = async(req,res)=>{
    try{
    const{email,username,password} = req.body;
    const user = new User({email,username});
    const registereduser = await User.register(user,password);
    req.login(registereduser,err=>{
        if (err) return next(err)
        req.flash('success',"Welcome to YelpCap");
        // res.send(req.body);
        res.redirect('/campgrounds')
    })
    console.log(registereduser);

    }
    catch (e){
        req.flash('error',e.message);
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render('Users/login.ejs');
}

module.exports.loginUser = (req,res)=>{
    req.flash('success',"Welcome Back");
    const redirectUrl = req.session.returnTo ||'/campgrounds';
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res)=>{
    req.logOut();
    req.flash('success','You are logged out')
    res.redirect('/campgrounds');
}