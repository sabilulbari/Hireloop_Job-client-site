"use server";

import { revalidatePath } from "next/cache";
import { serverPatchMutation } from "../core/server";
import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};
export const updateCompany = async (companyId,newCompanyData) => {
  const updateRes = serverMutation(`/api/companies/${companyId}`, newCompanyData, "PATCH");
  revalidatePath("/dashboard/admin/companies");
  return updateRes;

};


