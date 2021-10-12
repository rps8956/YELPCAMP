// const express = require('express');
// const router = express.Router({mergeParams: true});
// const {reviewSchema} = require('../Schemas.js');
// const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
// const { merge } = require('./campground.js');
// const { isLoggedIn } = require('../middleware.js');
// const reviews = require('../controllers/reviews');


module.exports.createReviews = async(req,res)=>{
    const campground =await (await Campground.findById(req.params.id));
    const review = new Review(req.body.review);
    review.author  = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Successfully made a new review');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReviews = async(req,res)=>{
    // res.send("I am deleted");
    console.log(req.params);
    const{id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success','Successfully deleted the review');
    res.redirect(`/campgrounds/${id}`);

}