import { ServiceTeam } from '../services/teams.service.js'

export const getTeams = async (req, res) => {
    const rows = await ServiceTeam.getAll()
    res.json(rows)
}

export const getTeamById = async (req, res) => {
    const team = await ServiceTeam.getTeamById(req.params.id)
    if(team === null) return res.status(404).json({message:'Team not found'})
    res.json(team)
}

export const createTeam =  async (req, res) => {
    const {name} = req.body;
    const responseError = {code: 500, message: 'DTO invalid'}

    if(!name || name === ''){
        res.send(responseError)
    }

    const teamId = await ServiceTeam.create(req.body);

    res.send({ 
        code: 200, 
        id: teamId
    })
}

export const getUsersByTeam = async (req, res) =>{
    const rows = await ServiceTeam.getAllUsersByTeam(req.params.id)
    res.json(rows)
}

export const updateTeam =  (req, res) => res.send('put respose')

export const deleteTeam =  (req, res) => res.send('delete respose')