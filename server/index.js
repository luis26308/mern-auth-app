import express from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'
import dbConnect from './db/index.js'
import router from './routes/index.js'
// import imageRouter from './routes/imageRoutes.js'
import { auth } from './auth/index.js'

const app = express()
// app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
}))

app.use(express.json()) // access info in the request body
app.use(express.urlencoded({ extended: true }))
auth(app)

// app.use((req, res, next) => {
//     console.log('Session:', req.session);
//     console.log('User:', req.user);
//     next();
// });

app.use(router)
dbConnect(app)

