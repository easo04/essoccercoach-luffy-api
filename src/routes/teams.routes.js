import {Router} from 'express'
import {getTeams, getTeamById, createTeam, updateTeam, deleteTeam, getUsersByTeam} from '../controllers/teams.controller.js'
import {isAuth, isAdmin} from '../../middlewares/auth.js'

const router = Router()

router.get('/teams', isAuth, getTeams)

router.get('/teams/:id', isAuth, getTeamById)

router.post('/teams', isAdmin, createTeam)

router.put('/teams', isAdmin, updateTeam)

router.delete('/teams', isAdmin, deleteTeam)

router.get('/teams/users/:id', isAuth, getUsersByTeam)

export default router