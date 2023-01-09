import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deleteAssessment(
    assessmentId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.assessments.delete({
            where: {
                id: assessmentId,
            },
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting assessment" };
    }
}
