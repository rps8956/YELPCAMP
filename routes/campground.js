const express = require('express');
const router = express.Router();



const {campgroundSchema} = require('../Schemas.js');
const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const {isLoggedIn,validateCampground,isAuthor} = require('../middleware');
const { populate } = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })




router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgrounds.createCampground));
// .post(upload.single('image'),(req,res)=>{
//     console.log(req.body,req.file);
//     res.send('It worked')
// })


router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campgrounds.updateCamground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm));


// router.get('/', catchAsync(campgrounds.index));
// router.get('/new',isLoggedIn, campgrounds.renderNewForm);

// router.post('/', validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground)); 

// router.get('/:id', catchAsync(campgrounds.showCampground));

// router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id',isAuthor, catchAsync(campgrounds.updateCamground));

// router.delete('/:id',isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;