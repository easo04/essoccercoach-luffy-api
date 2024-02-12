import express from 'express'
import teams from './routes/teams.routes.js'
import activities from './routes/activities.routes.js'
import seasons from './routes/seasons.routes.js'
import mycrocicles from './routes/mycrocicles.routes.js'
import users from './routes/users.routes.js'
import login from './routes/login.routes.js'
import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use('/api', teams)
app.use('/api', users)
app.use('/api', login)
app.use('/api', activities)
app.use('/api', seasons)
app.use('/api', mycrocicles)

app.listen(PORT)



