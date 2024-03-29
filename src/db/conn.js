const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {

        console.log("CONNECTION SUCCESSFUL");
        require('../app')
    }
    )
    .catch((err) => {
        console.log(`CONNECTION FAILED : ${err}`);
    })