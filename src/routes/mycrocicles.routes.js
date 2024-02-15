import {Router} from 'express'
import {getAllMycrocycles, getMycrocycleById, createMycrocycle, getAllActivitiesByMycrocicle} from '../controllers/mycrocicles.controller.js'
import {isAuth, isAdmin} from '../../middlewares/auth.js'

const router = Router()

router.get('/mycrocicles', isAuth, getAllMycrocycles)

router.get('/mycrocicles/:id', isAuth, getMycrocycleById)

router.get('/mycrocicles/activities/:id', isAuth, getAllActivitiesByMycrocicle)

router.post('/mycrocicles', isAdmin, createMycrocycle)


export default router