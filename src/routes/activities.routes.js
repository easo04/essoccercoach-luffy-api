import {Router} from 'express'
import {getActivities, getActivityById, createActivity, addUserToActivity} from '../controllers/activities.controller.js'
import {isAuth, isAdmin} from '../../middlewares/auth.js'

const router = Router()

router.get('/activities', isAuth, getActivities)

router.get('/activities/:id', isAuth, getActivityById)

router.post('/activities', isAdmin, createActivity)

router.post('/activities/user', isAdmin, addUserToActivity)

export default router