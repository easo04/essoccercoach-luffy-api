import {pool} from '../db.js'

export const getTeams = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teams')
    res.json(rows)
}

export const getTeamById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teams WHERE id = ?', [req.params.id])
    if(rows.length <= 0) return res.status(404).json({message:'Team not found'})
    res.json(rows[0])
}

export const createTeam =  async (req, res) => {
    const {name} = req.body;
    const responseError = {code: 500, message: 'DTO invalid'}

    if(!name || name === ''){
        res.send(responseError)
    }

    const [rows] = await pool.query('INSERT INTO teams (name) VALUES (?)', [name]);

    res.send({ 
        code: 200, 
        id: rows.insertId,
        name
    })
}

export const updateTeam =  (req, res) => res.send('put respose')

export const deleteTeam =  (req, res) => res.send('delete respose')