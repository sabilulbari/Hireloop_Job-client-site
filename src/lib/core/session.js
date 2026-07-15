import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), 
  });

  return session?.user || null;
};

export const getUserToken = async ()=>{
  const session = await auth.api.getSession({
    headers: await headers()
  })

  console.log(session?.session?.token);
  return session?.session?.token;
}

export const requireRoll = async (roll) => {
  const user = await getUserSession();

  if(!user){
    redirect("/auth/signin")
  }

  if (user?.role !== roll) {
    redirect("/unauthorize");
  }
};
