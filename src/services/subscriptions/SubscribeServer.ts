import Stripe from "stripe";
import prismaClient from "../../prisma";

interface SubscribeRequest {
  user_id: string;
}

class SubscribeServer {
  async execute({ user_id }: SubscribeRequest) {
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

    let customerId = findUser.stripe_customer_id;

    if (!customerId) {
      const stripeCusmoter = await stripe.customers.create({
        email: findUser.email,
      })

      await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          stripe_customer_id: stripeCusmoter.id,
        }
      })

      customerId = stripeCusmoter.id

    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: process.env.STRIPE_PRICE, quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return { sessionId: stripeCheckoutSession.id }

  }
}

export { SubscribeServer };