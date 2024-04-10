const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.js');
const { setUser } = require('../service/auth.js');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    // try {
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
    // } catch (error) {
    //     res.status(404).json({ error: "user with email or password already exist!!!" });
    // }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    // try {
    const user = await User.findOne({ email, password });
    // console.log('User', user);
    if (!user)
        return res.render("login", {
            error: "invalid Username or Password",
        });

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
    // return res.json({ token });

    // } catch (error) {
    //         res.status(404).json({ mes: "No credentials"})
    // }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
} 