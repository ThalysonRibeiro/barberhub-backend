import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserControlle } from "./controllers/user/AuthUserControlle";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.status(200).json({ ok: true });
});


// rotas user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserControlle().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.put('/users', isAuthenticated, new UpdateUserController().handle);

//rota haircuts
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle);


export { router };
