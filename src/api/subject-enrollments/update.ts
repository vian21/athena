import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updatesubjectEnrollments(subject_id: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.subject_enrollment.update({
            where: {
                id: subject_id
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Error updating subjectEnrollments" };
    }
}
export {
    updatesubjectEnrollments
}