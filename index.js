const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { CheckForAuthentication, restrictTo } = require('./middlewares/auth.js');
const mongoose = require('mongoose');


const urlRoute = require('./routes/url.js');
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require('./routes/user.js');

const URL = require('./models/url.js');



const app = express();
const Port = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckForAuthentication);

app.use('/url', restrictTo(["ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use("/", staticRoute);


app.get('/url/:short:Id', async (req, res) => {
    try {
        const {shortId} = req.params.shortId;
        // console.log(shortId); 
        const entry = await URL.findOneAndUpdate(
            { shortId, },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    },
                },
            }
        );
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error while updating and redirecting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


mongoose.connect('mongodb+srv://adekunlesamuel:Sam_1995@cluster0.mqe9eo8.mongodb.net/MordenURL-Shorter')
    .then(() => console.log('Connected to Mongoose server'))
    .catch(() => console.log('Failed to connect to Mongoose server'));


app.listen(Port, () => console.log(`Server listening on port: ${Port}`));

