import { serverMutation } from "../core/server";

export const addedSubscription = async (subscriptionData) => {
  return serverMutation("/api/subscription", subscriptionData);
};