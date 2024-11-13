"use server";

import { db } from "../../lib/db";
import { workExperienceTable } from "../../lib/schema";

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
