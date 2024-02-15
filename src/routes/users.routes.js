import {Router} from 'express'
import {getUserById, getUsers, createUser, getTeamsByUserId, addTeamToUser, getActivityByUser, getSummaryTeams} from '../controllers/users.controller.js'
import {isAuth, isAdmin} from '../../middlewares/auth.js'

const router = Router()

router.get('/users', isAuth, getUsers)

router.get('/users/:id', isAuth, getUserById)

router.get('/users/teams/:id', isAuth, getTeamsByUserId)

router.get('/users/summary/get-summary-teams/', isAuth, getSummaryTeams)

router.post('/users/get-activity-result', isAuth, getActivityByUser)

router.post('/users', isAdmin, createUser)

router.post('/users/team', isAdmin, addTeamToUser)

export default router