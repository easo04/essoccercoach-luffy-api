import {Router} from 'express'
import {getSeasons, getSeasonById, createSeason, getAllMycrociclesBySeason} from '../controllers/seasons.controller.js'
import {isAuth, isAdmin} from '../../middlewares/auth.js'

const router = Router()

router.get('/seasons', isAuth, getSeasons)

router.get('/seasons/:id', isAuth, getSeasonById)

router.get('/seasons/mycrocicles/:id', isAuth, getAllMycrociclesBySeason)

router.post('/seasons', isAdmin, createSeason)


export default router