import express from 'express';
import { UserController } from '../controllers/user.controller';
import {
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    GetUserByEmailUseCase,
} from '../../domain/interface/use-cases';
import passport from 'passport';
import { GetByUsernameUseCase } from '../../domain/interface/use-cases/get-by-username.use-case';
import { requireAdmin, requireAuth } from '@scxsocialcommon/errors';

export default function UserRouter(
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    getByUsernameUseCase: GetByUsernameUseCase,
    getUserByemailUsecase: GetUserByEmailUseCase
) {
    const router = express.Router();

    const userController = new UserController(
        createUserUseCase,
        getUserUseCase,
        updateUserUseCase,
        getByUsernameUseCase,
        getUserByemailUsecase
    );

    router.post('/login', async (req, res, next) => {
        userController.login(req, res, next);
    });

    router.post('/logout', async (req, res, next) => {
        userController.logout(req, res, next);
    });

    router.get('/currentuser', async (req, res, next) => {
        userController.getCurrentUser(req, res, next);
    });

    router.post('/google', async (req, res, next) => {
        userController.googleAuth(req, res, next);
    });

    router.put('/block/:id', requireAuth, requireAdmin, async (req, res, next) => {
        userController.blockUser(req, res, next);
    });

    router.put('/unblock/:id', requireAuth, requireAdmin, async (req, res, next) => {
        userController.unblockUser(req, res, next);
    });

    router.all('/*', async (req, res, next) => {
        userController.userService(req, res, next);
    });

    return router;
}
