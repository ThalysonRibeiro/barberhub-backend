import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";


class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;

    const newSchedule = new NewScheduleService();

    const schedule = await newSchedule.execute({
      user_id,
      haircut_id,
      customer,
    })

    res.json(schedule);

  }
}

export { NewScheduleController };