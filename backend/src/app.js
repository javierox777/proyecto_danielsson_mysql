import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {config} from 'dotenv'
import router from './routes/users/users'
config()


const app = express()


//setting
app.set("port", process.env.PORT || 3000)


//middlewares
app.use(express.json())


//routers
app.use("/api/users", router)

export default app