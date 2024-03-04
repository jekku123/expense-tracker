import express from 'express';
import { Container } from 'inversify';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { INTERFACE_TYPE } from '../utils/dependencies';

import { TokenService } from '../services/token.service';
import { IAuthService } from '../types/IAuthService';

import { ITokenService } from '../types/ITokenService';

const router = express.Router();

const container = new Container();

container.bind(INTERFACE_TYPE.AuthController).to(AuthController);

container.bind<IAuthService>(INTERFACE_TYPE.AuthService).to(AuthService);
container.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService);

const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);

router.post('/login', controller.onLogin.bind(controller));
router.post('/logout', controller.onLogout.bind(controller));
router.get('/refresh', controller.onRefreshToken.bind(controller));

export default router;
