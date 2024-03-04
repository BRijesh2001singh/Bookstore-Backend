const mongoose = require("mongoose");
mongoose.connect(process.env.DB).
    then(() => console.log("MONGOOSE CONNECTED")).catch((error) => {
        console.log(error);
    });
