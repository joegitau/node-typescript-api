import express, { Request, Response } from 'express';

import User from '../models/User.model';
import { IUser } from '../models/User.model';
const router = express.Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {
    const user: IUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    try {
        await user.save();

        res.status(201).json({message: "User registered!", user});
    } catch (err) {
        res.status(401).json({ err });
    }
});

// Fetch user's sessions
router.get('/', (req:Request, res: Response) => {

});

// Login user 
router.post('/login', (req: Request, res: Response) => {

});

// Logout user 
router.delete('/logout', (req: Request, res: Response) => {

});

export default router;
