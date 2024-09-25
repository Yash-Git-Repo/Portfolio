const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config('./.env')

const morgan = require('morgan')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload');

const dbconnect = require('./dbConnect')

//routes
const messageRouter = require('./routers/messageRouter')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const timelineRouter = require('./routers/timelineRouter')
const softwareApplicationRouter = require('./routers/softwareApplicationRouter')
const skillsRouter = require('./routers/skillsRouter')
const projectsRouter = require('./routers/projectRouter')



//middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [
        'https://yash-shivhare.netlify.app',
        'https://yash-portfolio-dashboard.netlify.app'  
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

const PORT = process.env.PORT || 4001

dbconnect()
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use('/api/message',messageRouter)
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/timeline',timelineRouter)
app.use('/api/softwareApplication',softwareApplicationRouter)
app.use('/api/skills',skillsRouter)
app.use('/api/projects',projectsRouter)



