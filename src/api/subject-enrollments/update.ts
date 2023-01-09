import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function updateSubjectEnrollment(
    subject_id: Id,
    newData: object,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.subject_enrollments.update({
            where: {
                id: subject_id,
            },
            data: newData,
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Error updating subjectEnrollments" };
    }
}
