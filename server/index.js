const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const ConnectionDB = require("./database");
const cors = require('cors')
const userSchema = require('./schemas/UserSchema')
const session = require("express-session");
const multer = require('./middleware/multer')

const PassPort = require('./middleware/passport')
const pass = PassPort.passport
require("dotenv/config");

app.use(express.json());
app.use(cors())
app.use('/api/passport', require('./middleware/passport').router)
app.use('/api/user', require('./routes/user'))
app.use("/api/image", multer.router)
app.use('/api/category', require('./routes/category'))
app.use('/api/batch', require('./routes/batch'))
app.use('/api/product', require('./routes/product'))
app.use('/api/retailer', require('./routes/retailer'))
app.use('/api/order', require('./routes/order'))
app.use('/api/reports', require('./routes/reports'))
app.use('/api/worker', require('./routes/worker'))



ConnectionDB();



app.get("/auth/google",
    pass.authenticate("google", { scope: ["email", "profile"] })
);
app.get("/auth/google/callback",

    pass.authenticate("google", { failureRedirect: "http://localhost:3000", session: false }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        console.log("REdirecting")
        res.redirect("https://google.com");
    });



app.listen(port, () => console.log(`Server up and running...at ${port}`))