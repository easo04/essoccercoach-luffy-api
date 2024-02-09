import {Router} from 'express'
import {getTeams, getTeamById, createTeam, updateTeam, deleteTeam} from '../controllers/teams.controller.js'

const router = Router()

router.get('/teams', getTeams)

router.get('/teams/:id', getTeamById)

router.post('/teams', createTeam)

router.put('/teams', updateTeam)

router.delete('/teams', deleteTeam)

export default router