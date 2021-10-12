const express = require('express');
const router = express.Router({mergeParams: true});
const {reviewSchema} = require('../Schemas.js');
const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { merge } = require('./campground');
const { isLoggedIn } = require('../middleware.js');
const reviews = require('../controllers/reviews');


const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}


router.post('/',validateReview,isLoggedIn, catchAsync(reviews.createReviews));

router.delete('/:reviewId',catchAsync(reviews.deleteReviews));

module.exports = router;