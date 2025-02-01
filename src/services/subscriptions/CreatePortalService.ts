import Stripe from "stripe";
import prismaClient from "../../prisma";

interface CreatePortalRequest {
  user_id: string;
}
class CreatePortalService {
  async execute({ user_id }: CreatePortalRequest) {

    const stripe = new Stripe(
      process.env.STRIPE_API_KEY,
      {
        apiVersion: '2025-01-27.acacia',
        appInfo: {
          name: 'barberhub',
          version: '1'
        }
      }
    )

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    })

    let sessionId = findUser.stripe_customer_id;
    if (!sessionId) {
      console.log("nao tem id");
      return { message: "User not found" }

    }

    const pottalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL,
    })

    return { sessionId: pottalSession.url }

  }
}

export { CreatePortalService }