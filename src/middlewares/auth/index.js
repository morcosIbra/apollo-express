import passport from 'passport';
import session from 'express-session';
import sequelizeSession from 'express-session-sequelize';
import { validPassword } from '../../utils';
import { db } from '../../db/config';
import strategy from 'passport-local';

const SessionStore = sequelizeSession(session.Store);
const LocalStrategy = strategy.Strategy;
const { user } = db.models;

const middleware = app => {
    /**
     * This function is called when the `passport.authenticate()` method is called.
     * 
     * If a user is found an validated, a callback is called (`cb(null, user)`) with the user
     * object.  The user object is then serialized with `passport.serializeUser()` and added to the 
     * `req.session.passport` object. 
     */
    passport.use(new LocalStrategy(
        async function (username, password, cb) {
            try {
                const user = await db.models.user.findOne({ where: { username: username } })
                if (!user) { return cb(null, false) }

                const isValid = validPassword(password, user.hash, user.salt);

                if (isValid) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            } catch (err) {
                cb(err);
            }
        }));
    /**
     * This function is used in conjunction with the `passport.authenticate()` method.  See comments in
     * `passport.use()` above ^^ for explanation
     */
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    /**
     * This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
     * Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
     * 
     * In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
     * object later on.
     */

    passport.deserializeUser(async function deserializeFn(id, cb) {
        try {
            const user = await db.models.user.findOne({ where: { "id": id } });
            cb(null, user.dataValues)
        } catch (error) {
            cb(error)
        }

    });
    /**
     * -------------- SESSION SETUP ----------------
     */
    /**
     * The SequelizeStore is used to store session data.  We will learn more about this in the post.
     * 
     * Note that the `connection` used for the MongoStore is the same connection that we are using above
     */
    const sessionStore = new SessionStore({
        db: db.instance,
    });
    /**
     * See the documentation for all possible options - https://www.npmjs.com/package/express-session
     * 
     * As a brief overview (we will add more later): 
     * 
     * secret: This is a random string that will be used to "authenticate" the session.  In a production environment,
     * you would want to set this to a long, randomly generated string
     * 
     * resave: when set to true, this will force the session to save even if nothing changed.  If you don't set this, 
     * the app will still run but you will get a warning in the terminal
     * 
     * saveUninitialized: Similar to resave, when set true, this forces the session to be saved even if it is unitialized
     *
     * store: Sets the MemoryStore to the MongoStore setup earlier in the code.  This makes it so every new session will be 
     * saved in a MongoDB database in a "sessions" table and used to lookup sessions
     * 
     * cookie: The cookie object has several options, but the most important is the `maxAge` property.  If this is not set, 
     * the cookie will expire when you close the browser.  Note that different browsers behave slightly differently with this
     * behaviour (for example, closing Chrome doesn't always wipe out the cookie since Chrome can be configured to run in the
     * background and "remember" your last browsing session)
     */
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    }));
    /**
     * -------------- PASSPORT AUTHENTICATION ----------------
     */
    /**
     * Notice that these middlewares are initialized after the `express-session` middleware.  This is because
     * Passport relies on the `express-session` middleware and must have access to the `req.session` object.
     * 
     * passport.initialize() - This creates middleware that runs before every HTTP request.  It works in two steps: 
     *      1. Checks to see if the current session has a `req.session.passport` object on it.  This object will be
     *          
     *          { user: '<Mongo DB user ID>' }
     * 
     *      2.  If it finds a session with a `req.session.passport` property, it grabs the User ID and saves it to an 
     *          internal Passport method for later.
     *  
     * passport.session() - This calls the Passport Authenticator using the "Session Strategy".  Here are the basic
     * steps that this method takes:
     *      1.  Takes the MongoDB user ID obtained from the `passport.initialize()` method (run directly before) and passes
     *          it to the `passport.deserializeUser()` function (defined above in this module).  The `passport.deserializeUser()`
     *          function will look up the User by the given ID in the database and return it.
     *      2.  If the `passport.deserializeUser()` returns a user object, this user object is assigned to the `req.user` property
     *          and can be accessed within the route.  If no user is returned, nothing happens and `next()` is called.
     */
    app.use(passport.initialize());
    app.use(passport.session());
}
export default middleware;
