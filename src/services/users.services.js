'user strict'
import {pool} from '../db.js'
import { ServiceSeason } from '../services/seasons.service.js'
import { ServiceActivity } from '../services/activities.service.js'

export class ServiceUser{

    static async getAll () {
        const [rows] = await pool.query('SELECT * FROM users')
        return rows
    }

    static async getUserById (id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        if(rows.length <= 0) return null
        return rows[0]
    }

    static async getUserByEmail(email){
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length <= 0) return null
        return rows[0]
    }

    static async isUserAdmin (id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        if(rows.length <= 0) return false
        return rows[0].type === 'admin'
    }

    static async isUserExistByEmail(email){
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        return rows.length > 0
    }

    static async create (userDTO){
        const {firstName, lastName, email, birthDate, position, numberPlayer, teamId, type} = userDTO;

        const [user] = await pool.query('INSERT INTO users (firstName, lastName, email, birthDate, positon, numberPlayer, teamId, type) VALUES (?,?,?,?,?,?,?,?)',
            [firstName, lastName, email, birthDate, position, numberPlayer, null, type]);

        if(!user){
            return null
        }

        const [userTeam] = await pool.query('INSERT INTO userTeam (teamId, userId) VALUES (?,?)',
            [teamId, user.insertId]);

        return user.insertId
    }

    static async getAllTeamsByUser(id){
        const [rows] = await pool.query('select teams.id, teams.name from teams inner join userteam on teams.id = userteam.teamId where userteam.userId = ?', [id])
        return rows
    }

    static async addTeamToUser(teamId, userId, access){
        await pool.query('INSERT INTO userTeam (teamId, userId, access) VALUES (?,?,?)',
            [teamId, userId, access]);
    }

    static async getActivityByUser(activityUserDTO){
        const {activityId, userId} = activityUserDTO
        const [rows] = await pool.query('SELECT * FROM useractivity where activityId = ? AND userId = ?', [activityId, userId])
        return rows[0]
    }

    static async getSummaryTeamsByUser(user){
        const {firstName, lastName, email, type, position, id} = user

        let teams = await this.getAllTeamsByUser(id)

        for(let i=0;i<teams.length;i++){
            const currentSeason = await ServiceSeason.getCurrentSeasonByTeam(teams[i].id, new Date())
            teams[i].currentSeason = currentSeason
        }

        const summaryDTO = {
            infos:{id, firstName, lastName, email, type, position},
            teams: teams,
        }

        return summaryDTO
    }
}
