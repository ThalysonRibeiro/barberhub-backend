import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from '../../utils/stripe'

import { saveSubscription } from '../../utils/manageSubscription'

class WebhooksController {
  async handle(request: Request, response: Response) {
    let event: Stripe.Event = request.body;

    let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (endpointSecret) {
      const signature = request.headers['stripe-signature']

      try {

        event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret)

      } catch (err) {
        return response.status(400).send(`Webhook error: ${err.message}`);
      }
    }


    switch (event.type) {
      case 'customer.subscription.deleted':
        const payment = event.data.object as Stripe.Subscription;

        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        )

        break;
      case 'customer.subscription.updated':
        const paymentIntent = event.data.object as Stripe.Subscription;

        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false
        )

        break;
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
        )

        break;
      default:
        console.log(`Evento desconhecido ${event.type}`)
    }


    response.send();


  }
}

export { WebhooksController }