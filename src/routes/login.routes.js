import {Router} from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import {TOKEN_HEADER_KEY, JWT_SECRET_KEY} from '../config.js'


const router = Router()

router.post('/login/generate-token', (req, res) =>{
    let jwtSecretKey = JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: req.body.userId,
        exp: moment().add(1, 'days').unix()
    };
    
    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
})

router.get("/login/validate-token", (req, res) => {
 
    let tokenHeaderKey = TOKEN_HEADER_KEY;
    let jwtSecretKey = JWT_SECRET_KEY;
 
    try {
        const token = req.header(tokenHeaderKey);
 
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
})

export default router