import User from '../db/models/user.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

const authControllers = {
    register: (req, res) => {
        // console.log(req.body)
        let { firstName, lastName, email, password, username } = req.body
        User.findOne({ $or: [{ email }, { username }] })
            .then((user) => {
                let response = { auth: false }
                if (user) {
                    if (user.username === username && user.email === email) {
                        response.message = 'username and email already taken'
                    } else if (user.username === username) {
                        response.message = 'username already taken'
                    } else if (user.email === email) {
                        response.message = 'email already taken'
                    }
                    res.json(response)
                } else {
                    const hash = bcryptjs.hashSync(password, 10)
                    let userData = { firstName, lastName, email, password: hash, username }
                    let newUser = new User(userData)
                    newUser.save()
                        .then((user) => {
                            response.auth = true
                            response.user = user
                            res.json(response)
                        })
                }
            })
    },
    login: (req, res) => {
        let { username, password } = JSON.parse(req.params.userData)
        console.log(username, password)
        User.findOne({username})
            .then(user=>{
                if (user) {
                    // the username does exist
                    // we need to validate the password
                    // if the user exist it will be an object
                    // console.log(bcryptjs.compareSync(password, user.password))
                    let bool = bcryptjs.compareSync(password, user.password)
                    if (bool){
                        // login is succuessful
                        let userInfo = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email
                        }
                        res.json({userInfo, auth:true})
                    }else {
                        // the password is incorrect
                        res.json({auth:false, message:'password or username is incorrect'})
                    }
                }else {
                    // the username is incorrect
                    res.json({auth:false, message:'password or username is incorrect'})
                }
            })
    }
}

export default authControllers