const Campground = require('./models/campground');
const {campgroundSchema} = require('./Schemas.js');
const ExpressError = require('./utilities/ExpressError');

module.exports.isLoggedIn = (req,res,next)=>{ 
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','Sign In required')
        return res.redirect('/login');
}
    next();
}

module.exports.validateCampground = (req,res,next)=>{


    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next();
    }
    // console.log(result);
}

module.exports.isAuthor =async (req,res,next)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)){
        req.flash('error','You are not permited to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
