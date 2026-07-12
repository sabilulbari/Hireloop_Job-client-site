import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), 
  });

  return session?.user || null;
};

export const requireRoll = async (roll) => {
  const user = await getUserSession();
  if (user?.roll !== roll) {
    redirect("/unauthorize");
  }
};
