import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateAssessment(assessmentId: Id, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.assessments.update({
            where: {
                id: assessmentId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Cannot update assessments" };
    }
}
export {
    updateAssessment
}