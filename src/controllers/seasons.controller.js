import { ServiceSeason } from '../services/seasons.service.js'

export const getSeasons = async (req, res) => {
    const rows = await ServiceSeason.getAll()
    res.json(rows)
}

export const getSeasonById = async (req, res) => {
    const season = await ServiceSeason.getSeasonById(req.params.id)
    if(season === null) return res.status(404).json({message:'season not found'})
    res.json(season)
}

export const getAllMycrociclesBySeason = async (req, res) => {
    const seasons = await ServiceSeason.getAllMycrociclesBySeason(req.params.id)
    res.json(seasons)
}

export const createSeason=  async (req, res) => {
    const seasonId = await ServiceSeason.create(req.body)

    res.send({ 
        code: 200, 
        seasonId
    })
}
