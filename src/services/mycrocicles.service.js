'user strict'
import {pool} from '../db.js'

export class ServiceMycrocicle{
    static async getAll (){
        const [rows] = await pool.query('SELECT * FROM mycrocicle')
        return rows
    }
    
    static async  getMycrocicleById (id){
        const [rows] = await pool.query('SELECT * FROM mycrocicle WHERE id = ?', [id])
        if(rows.length <= 0) return null
        return rows[0]
    }
    
    static async create (mycrocicleDTO){
        const {startDate, endDate, theme, seasonId, teamId} = mycrocicleDTO;
    
        const [rows] = await pool.query('INSERT INTO mycrocicle (startDate, endDate, theme, seasonId, teamId) VALUES (?,?,?,?,?)', [startDate, endDate, theme, seasonId, teamId]);

        return rows.insertId
    }

    static async getAllActivitiesByMycrocicle(idMycrocicle){
        const [rows] = await pool.query('SELECT activities.* FROM activities INNER JOIN mycrocicle ON mycrocicle.id = activities.mycrocicleId WHERE mycrocicle.id = ?', [idMycrocicle])
        return rows
    }
}