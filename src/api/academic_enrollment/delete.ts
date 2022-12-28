import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deleteAcademicEnrollment(enrollmentId: Id, db: PrismaClient, logger: Logger) {
    try {
        await db.academic_enrollments.delete({
            where: {
                id: enrollmentId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting academic enrollment" };
    }
}
