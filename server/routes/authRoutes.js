import passport from 'passport'
import express from 'express'
import authControllers from '../controllers/authControllersV2.js'
import { upload } from '../db/multer/index.js';

const authRouter = express.Router()



// authRouter.route('/register').post( authControllers.register)
authRouter.route('/register').post(upload.single('profilePic'), authControllers.register)

authRouter.route('/login').post(authControllers.login)
authRouter.route('/logout').post(authControllers.logout)
authRouter.route('/').post( authControllers.validateAuth)


export default authRouter