import express from 'express';
import { UserController } from '../controllers/user.controller';

export default function UserRouter() {
    const router = express.Router();

    const userController = new UserController();

    router.get('/currentuser', async (req, res, next) => {
        userController.getCurrentUser(req, res, next);
    });

    return router;
}
