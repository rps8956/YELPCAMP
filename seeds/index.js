const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '60ef091341b98d3aa01c4716',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point', 
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            
            description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
            price,
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/doimpemqt/image/upload/v1626530681/YelpCamp/oizd4qihoj4f7xad6off.png',
                  filename: 'YelpCamp/oizd4qihoj4f7xad6off'
                },
                {
                  
                  url: 'https://res.cloudinary.com/doimpemqt/image/upload/v1626530681/YelpCamp/h7ef7rcz1cjkumveruqm.jpg',
                  filename: 'YelpCamp/h7ef7rcz1cjkumveruqm'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})