import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function insertAssessment(
    assessmentObject: any,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.assessments.create({
            data: assessmentObject,
        });

        return { success: true };
    } catch (error: any) {
        return { error: "cannot create an assessment" };
    }
}
