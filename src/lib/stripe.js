import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1TrWs6HteSKm5rbxyvOqQqCl",
  seeker_premium: "price_1TrhJUHteSKm5rbxu2mfMxtg",
  recruiter_growth: "price_1TrhLSHteSKm5rbxPRnJ7k0K",
  recruiter_enterprise: "price_1TrhMAHteSKm5rbxUMj4wbfd",
};
