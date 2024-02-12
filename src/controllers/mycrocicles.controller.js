import { ServiceMycrocicle } from '../services/mycrocicles.service.js'

export const getAllMycrocycles = async (req, res) => {
    const rows = await ServiceMycrocicle.getAll()
    res.json(rows)
}

export const getMycrocycleById = async (req, res) => {
    const mycrocicle = await ServiceMycrocicle.getMycrocicleById(req.params.id)
    if(mycrocicle === null) return res.status(404).json({message:'mycrocicle not found'})
    res.json(mycrocicle)
}

export const getAllActivitiesByMycrocicle = async (req, res) => {
    const mycrocicles = await ServiceMycrocicle.getAllActivitiesByMycrocicle(req.params.id)
    res.json(mycrocicles)
}

export const createMycrocycle=  async (req, res) => {
    const mycrocicleId = await ServiceMycrocicle.create(req.body)

    res.send({ 
        code: 200, 
        mycrocicleId
    })
}
