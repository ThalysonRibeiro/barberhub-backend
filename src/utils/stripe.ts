import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2025-01-27.acacia',
    appInfo: {
      name: 'barberpro-web.vercel.app',
      version: '1'
    }
  }
);