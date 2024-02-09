import {Router} from 'express'
import {getUserById, getUsers, createUser, getUserByTeamId} from '../controllers/users.controller.js'

const router = Router()

router.get('/users', getUsers)

router.get('/users/:id', getUserById)

router.get('/users/team/:id', getUserByTeamId)

router.post('/users', createUser)

//router.put('/users', updateTeam)

//router.delete('/users', deleteTeam)

export default router