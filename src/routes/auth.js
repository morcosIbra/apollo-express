import passport from "passport";
import { genPassword } from "../utils";
import express from 'express';
import { db } from '../db/config';
const { user } = db.models;
const router = express.Router();

/** for test purpose only */
router.get('/signin', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/auth/login">\
Enter Username:<br><input type="text" name="username">\
<br>Enter Password:<br><input type="password" name="password">\
<br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});
router.get('/signup', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                Enter Username:<br><input type="text" name="username">\
                <br>Enter Password:<br><input type="password" name="password">\
                <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});
/**************** */

router.post('/signin', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
});

router.post('/signup', async (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const data = await user.create({
        username: req.body.username,
        hash,
        salt
    })
    res.redirect('/auth/login');
});
router.get('/signin', (req, res, next) => {
    req.logout();
    res.redirect('/auth/login');
});

export default router;