

import passport from 'passport'
import session from 'express-session'
import { config } from 'dotenv'
import { strategy } from './strategy.js'
import MongoStore from 'connect-mongo'
import User from '../db/models/user.js'


if (process.env.NODE_ENV !== 'production') {
    config()
}

export const auth = (app) => {
    // console.log(process.env.SESSION_SECRET)
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
            cookie: {
                httpOnly: true,
                secure: false, // Set to true in production
                sameSite: true,
                domain: 'localhost',
                maxAge: 1000 * 60 * 60 * 24
            },
            key: 'express.sid'
        })
    );
    app.use(passport.initialize());
    app.use(passport.session())


    strategy(passport)

}