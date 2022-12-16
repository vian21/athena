import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteAssessment(assessmentId: number, db: PrismaClient, logger: Logger) {
    try {
        const assessment = await db.assessments.delete({
            where: {
                id: assessmentId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting assessment" };
    }
}