'user strict'
import {pool} from '../db.js'

export class ServiceSeason{
    static async getAll (){
        const [rows] = await pool.query('SELECT * FROM season')
        return rows
    }
    
    static async  getSeasonById (id){
        const [rows] = await pool.query('SELECT * FROM season WHERE id = ?', [id])
        if(rows.length <= 0) return null
        return rows[0]
    }
    
    static async create (seasonDTO){
        const {startDate, endDate, name, teamId} = seasonDTO;
    
        const [rows] = await pool.query('INSERT INTO season (startDate, endDate, name, teamId) VALUES (?,?,?,?)', [startDate, endDate, name, teamIdme]);

        return rows.insertId
    }

    static async getAllMycrociclesBySeason(idSeason){
        const [rows] = await pool.query('SELECT mycrocicle.* FROM mycrocicle INNER JOIN season ON mycrocicle.seasonId = season.id WHERE season.id = ?', [idSeason])
        return rows
    }
}