import { ServiceUser } from '../services/users.services.js'

export const getUsers = async (req, res) => {
    const rows = await ServiceUser.getAll()
    res.json(rows)
}

export const getUserById = async (req, res) => {
    const user = await ServiceUser.getUserById(req.params.id)
    if(user === null) return res.status(404).json({message:'User not found'})
    res.json(user)
}

export const getTeamsByUserId = async (req, res) => {
    const rows = await ServiceUser.getAllTeamsByUser(req.params.id)
    res.json(rows)
}

export const getActivityByUser = async (req, res) => {
    const activityResult = await ServiceUser.getActivityByUser(req.body)
    res.json(activityResult)
}

export const getSummaryTeams = async (req, res) =>{
    const response = await ServiceUser.getSummaryTeamsByUser(req.user)
    res.json(response)
}

export const createUser =  async (req, res) => {
    const {email} = req.body

    if(email && ServiceUser.isUserExistByEmail(email)){
        return res.status(500).json({message: 'User already exist with same email', code:'USER_ALREADY_EXIST_EMAIL'})
    }

    const userId = await ServiceUser.create(req.body)

    res.send({ 
        code: 200, 
        userId
    })
}

export const addTeamToUser = async (req, res) =>{
    const {teamId, userId, access} = req.body

    await ServiceUser.addTeamToUser(teamId, userId, access)

    res.send({ 
        code: 200, 
        message:'User added'
    })
}