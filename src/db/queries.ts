"use server";

import { db } from "@/db";
import { analysis } from "./schema";
import { auth } from "@/auth";
import { User } from "next-auth";
import { eq } from "drizzle-orm";

// fix types in function params
const checkAuthenticatedUser = async () => {
  const session = await auth();
  let user: User | null = null;
  if (session) {
    user = session.user;
  } else {
    throw new Error("No authenticated user found");
  }
  return user;
};

export const addAnalysisResult = async (analysisData: any) => {
  try {
    const user = await checkAuthenticatedUser();
    await db.insert(analysis).values({
      ...analysisData,
      userId: user.id,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllAnalysisResults = async () => {
  try {
    const user = await checkAuthenticatedUser();
    const results = await db.query.analysis.findMany({
      where: eq(analysis.userId, user.id),
    });
    return results;
  } catch (e) {
    console.log(e);
  }
};
