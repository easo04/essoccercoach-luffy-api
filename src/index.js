import express from 'express'
import teams from './routes/teams.routes.js'
//import activities from './routes/activities.routes.js'
import users from './routes/users.routes.js'
import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use('/api', teams)
//app.use('/api', activities)
app.use('/api', users)

app.listen(PORT)



