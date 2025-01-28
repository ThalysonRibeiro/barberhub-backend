import { Request, Response } from "express";
import { SubscribeServer } from "../../services/subscriptions/SubscribeServer";

class SubscribeController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const subscribeServer = new SubscribeServer();

    const subscribe = await subscribeServer.execute({
      user_id
    })

    return res.json(subscribe);
  }
}

export { SubscribeController };