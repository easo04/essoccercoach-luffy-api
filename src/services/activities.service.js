'user strict'
import {pool} from '../db.js'

export class ServiceActivity{

    static async getAll () {
        const [rows] = await pool.query('SELECT * FROM activities')
        return rows
    }

    static async  getActivityById (id){
        const [rows] = await pool.query('SELECT * FROM activities WHERE id = ?', [id])
        if(rows.length <= 0) return null
        return rows[0]
    }
    
    static async create (activityDTO){
        const {name, type, dateActivity, teamId, userCreateId, EPR} = activityDTO;
    
        const [rows] = await pool.query('INSERT INTO activities (name, type, dateActivity, teamId, userCreateId, EPR) VALUES (?)', [name, type, dateActivity, teamId, userCreateId, EPR]);

        return rows.insertId
    }

    static async addUserToActivity(activityUserDTO){
        const {activityId, userId, EPR, notes} = activityUserDTO;
    
        const [rows] = await pool.query('INSERT INTO useractivity (activityId, userId, EPR, notes) VALUES (?)', [activityId, userId, EPR, notes]);

        return rows.insertId
    }
}