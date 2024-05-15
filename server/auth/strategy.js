import LocalStrategy from 'passport-local'
import bcryptjs from 'bcryptjs'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../db/models/user.js'
import 'dotenv/config'


export const strategy = (passport) => {


    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, (username, password, done) => {
        // console.log(username, password)
        User.findOne({ username })
            .then(user => {
                // console.log(user)
                if (!user) {
                    console.log('no user')
                    return done(null, false, { message: `Incorrect username or password` })
                }
                if (!bcryptjs.compareSync(password, user.password)) {
                    console.log('passwords dont match')
                    return done(null, false, { message: `Incorrect username or password` })
                }
                return done(null, user)
            }).catch(err => done(err))
    })
    );

    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, username, password, done) => {

        let { firstName, lastName, email } = req.body
        let { filename: profileImage } = req.file
        // console.log('buffer',req.file.buffer);
        User.findOne({ $or: [{ email }, { username }] })
            .then(data => {
                if (data) {
                    if (data.email) return done(null, false, { message: `${email} is already taken.` })
                    if (data.username) return done(null, false, { message: `${username} is already taken.` })
                } else {
                    const hash = bcryptjs.hashSync(password, 10)
                    let newUser = new User({ firstName, lastName, email, password: hash, username, profileImage });
                    newUser
                        .save()
                        .then(user => done(null, user))
                        .catch(err => {
                            // console.log('test');
                            done(err)
                        })
                }
            }).catch(err => {
                // console.log('test');
                done(err)
            })
    }));

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        console.log('jwt', jwt_payload)
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    console.log('success')
                    return done(null, user);
                }
                console.log('failed')
                return done(null, false);
            }).catch(err => done(err, false));
    }));


    passport.serializeUser((user, done) => {
        console.log('serialized', user);
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        // let user = await User.findById(id)
        // console.log('deserialized', user);
        // done(null, user)
        User.findById(id).then((user) => {
            console.log('deserialized', user);
            done(null, user)
        })
    });
}