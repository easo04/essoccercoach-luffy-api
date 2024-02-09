import {pool} from '../db.js'

export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
}

export const getUserById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    if(rows.length <= 0) return res.status(404).json({message:'User not found'})
    res.json(rows[0])
}

export const getUserByTeamId = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE teamId = ?', [req.params.id])
    res.json(rows)
}

export const createUser =  async (req, res) => {
    const {firstName, lastName, email, birthDate, position, numberPlayer, teamId, type} = req.body;
    const responseError = {code: 500, message: 'DTO invalid'}

    const [rows] = await pool.query('INSERT INTO users (firstName, lastName, email, birthDate, positon, numberPlayer, teamId, type) VALUES (?,?,?,?,?,?,?,?)',
        [firstName, lastName, email, birthDate, position, numberPlayer, teamId, type]);

    res.send({ 
        code: 200, 
        id: rows.insertId,
        email,
        teamId
    })
}
