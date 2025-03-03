"use server";

import { db } from "../db";
import { workExperienceTable } from "../schema";

export async function getWorkExperience() {
  try {
    const workExperience = await db
      .select()
      .from(workExperienceTable)
      .orderBy(workExperienceTable.startDate);

    return workExperience;
  } catch (error) {
    console.error("Error fetching work experience:", error);
    throw new Error("Failed to fetch work experience");
  }
}
