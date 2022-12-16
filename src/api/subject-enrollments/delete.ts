import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteSubjectEnrollment(subject_id: number, db: PrismaClient, logger: Logger) {
    try {
        const subjectsEnrollment = await db.subject_enrollment.delete({
            where: {
                id: subject_id
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting the subject enrollment" };
    }
}