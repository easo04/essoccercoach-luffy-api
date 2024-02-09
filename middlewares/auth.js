'use strict'

import jwt from 'jsonwebtoken'
import moment from 'moment'
import {JWT_SECRET_KEY} from '../src/config.js'
import { ServiceUser } from '../src/services/users.services.js'

/**
 * Permet de vérifier si le token est valide
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const isAuth = async (req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Not authorization'})
    }

    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token, JWT_SECRET_KEY)

    if(payload.exp <= moment().unix()){
        return res.status(401).send({message:'Token expired'})
    }

    const user = await ServiceUser.getUserById(payload.userId)

    console.log(user + ' valid token')

    if(user === null){
        return res.status(401).send({message:'Token invalid'})
    }

    req.user = payload.userId
    next()
}

/**
 * Permet de valider si le token est valide et si l'usager est admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const isAdmin = async (req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Not authorization'})
    }

    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token, JWT_SECRET_KEY)

    if(payload.exp <= moment().unix()){
        return res.status(401).send({message:'Token expired'})
    }

    const isAdmin = await ServiceUser.isUserAdmin(payload.userId)

    console.log(isAdmin + ' isadmin')

    if(!isAdmin){
        return res.status(401).send({message:'Not authorization'})
    }

    req.user = payload.userId
    next()
}

