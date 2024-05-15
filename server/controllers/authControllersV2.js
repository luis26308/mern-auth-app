import passport from "passport";
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js'


const authControllers = {
    register: (req, res, next) => {
        console.log(req.body);
        passport.authenticate('register', (err, user, info) => {
            console.log(user);
            if (err) {
                return res.status(401).json(info)
            }
            if (!user) {
                return res.status(401).json(info)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

                    res.json({
                        auth: true,
                        token,
                        userInfo: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            profileImage: user.profileImage
                        }
                    })
                })
            }
        })(req, res, next)
    },
    login: (req, res, next) => {
        // console.log(req.body)
        passport.authenticate("login", (err, user, info) => {
            const response = { auth: false }
            if (err) {
                response.info = info
                return res.status(401).json(response)
            }
            if (!user) {
                response.info = info
                return res.status(401).json(response)
            }
            else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(user)
                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                        res.json({
                            auth: true,
                            token,
                            userInfo: {
                                id: user._id,
                                username: user.username,
                                email: user.email,
                                profileImage: user.profileImage
                            }
                        })
                    }
                });
            }
        })(req, res, next)
    },

    logout: (req, res, next) => {
        console.log(req.user)

        req.logout(err => {
            // console.log(req.session)

            if (err) {
                console.log(err)
            }
            res.json({ message: "User is now logged out" })
        })
    },

    validateAuth: (req, res) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            // console.log('test')
            // req.login(user, { session: false }, (err) => {

            //     console.log('inside req.login',user)
            // })
            if (err) {
                console.log(err)
                return res.status(401).json({ auth: false, message: "An error occurred" })
            }
            if (!user) {
                return res.status(401).json({ auth: false, message: "Unauthorized" })
            }
            return res.status(200).json({ auth: true, userInfo: { id: user._id, username: user.username, email: user.email, profileImage: user.profileImage } })
        })(req, res)
    }
}

export default authControllers