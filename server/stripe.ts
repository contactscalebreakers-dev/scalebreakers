import Stripe from "stripe";
import { ENV } from "./_core/env";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// Note: API version is managed by Stripe SDK

export { stripe };

export async function createCheckoutSession(params: {
  userId: string;
  userEmail: string;
  userName: string;
  items: Array<{
    name: string;
    amount: number; // in cents
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  try {
    const lineItems = params.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: params.userEmail,
      client_reference_id: params.userId,
      metadata: {
        user_id: params.userId,
        customer_email: params.userEmail,
        customer_name: params.userName,
        ...params.metadata,
      },
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      allow_promotion_codes: true,
    });

    return session;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
}

export async function getPaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Failed to retrieve payment intent:", error);
    throw error;
  }
}
