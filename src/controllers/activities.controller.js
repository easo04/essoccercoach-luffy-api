import { ServiceActivity } from '../services/activities.service.js'

export const getActivities = async (req, res) => {
    const rows = await ServiceActivity.getAll()
    res.json(rows)
}

export const getActivityById = async (req, res) => {
    const activity = await ServiceActivity.getActivityById(req.params.id)
    if(activity === null) return res.status(404).json({message:'activity not found'})
    res.json(activity)
}

export const createActivity =  async (req, res) => {
    const activityId = await ServiceActivity.create(req.body)

    res.send({ 
        code: 200, 
        activityId
    })
}

export const addUserToActivity = async (req, res) =>{
    await ServiceActivity.addUserToActivity(req.body)

    res.send({ 
        code: 200, 
        message:'User added to activity'
    })
}