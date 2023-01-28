const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const ConnectionDB = require("./database");
const cors = require('cors')
const userSchema = require('./schemas/UserSchema')
const session = require("express-session");

const PassPort = require('./middleware/passport')
const pass = PassPort.passport
require("dotenv/config");

app.use(express.json());
app.use(cors())
app.use('/api/passport', require('./middleware/passport').router)
ConnectionDB();


app.post('/api/user', async (req, res) => {
    console.log(req.body)
    const newUser = new userSchema({
        email: req.body.email
    })

    const saved = await newUser.save();
    res.status(200).json(saved)
})

app.get("/auth/google",
    pass.authenticate("google", { scope: [ "email","profile"] })
);
app.get("/auth/google/callback",

    pass.authenticate("google", { failureRedirect: "http://localhost:3000",session:false }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        console.log("REdirecting")
        res.redirect("https://google.com");
    });

// app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//         successRedirect: "https://google.com",
//         failureRedirect: "/login/failed",
//     })
// );


// app.get(
//     "/google",
//     passport.authenticate("google", {
//         successRedirect: "http://localhost:3000/",
//         failureRedirect: "/login/failed",
//     })
// );
// app.get("/google", passport.authenticate("google", { scope: ["profile"] }));


// app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//         successRedirect: "http://localhost:3000/",
//         failureRedirect: "/login/failed",
//     })
// );

// app.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect("http://localhost:3000");
// });



app.listen(port, () => console.log(`Server up and running...at ${port}`))