'user strict'
import {pool} from '../db.js'

export class ServiceTeam{

    static async getAll (){
        const [rows] = await pool.query('SELECT * FROM teams')
        return rows
    }
    
    static async  getTeamById (id){
        const [rows] = await pool.query('SELECT * FROM teams WHERE id = ?', [id])
        if(rows.length <= 0) return null
        return rows[0]
    }
    
    static async create (teamDTO){
        const {name} = teamDTO;
    
        const [rows] = await pool.query('INSERT INTO teams (name) VALUES (?)', [name]);

        return rows.insertId
    }

    static async getAllUsersByTeam(id){
        const [rows] = await pool.query('select users.* from users inner join userTeam on users.id = userTeam.userId where userTeam.teamId = ?', [id])
        return rows
    }
    
}