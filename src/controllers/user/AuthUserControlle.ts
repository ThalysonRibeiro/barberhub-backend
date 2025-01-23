import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserControlle {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    const session = await authUserService.executa({
      email,
      password
    });

    return res.json(session);
  }
}

export { AuthUserControlle };