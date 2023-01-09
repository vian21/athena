import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deleteSubjectEnrollment(
    subject_id: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.subject_enrollments.delete({
            where: {
                id: subject_id,
            },
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting the subject enrollment" };
    }
}
