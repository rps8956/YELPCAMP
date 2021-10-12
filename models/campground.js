const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review');

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
});

const opts = {toJSON:{virtuals:true}};

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [imageSchema],
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`// copied from the Geojson cateogary in mongoose docs
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    
    
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Review'
                }
             ]
},opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a href ="/campgrounds/${this._id}">${this.title}</a>`
})

CampgroundSchema.post('findOneAndDelete',async function(doc){
    // console.log("deleted");
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);