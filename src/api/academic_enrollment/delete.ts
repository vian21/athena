import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

async function deleteAcademicEnrollment(enrollmentId: number, db: PrismaClient, logger: Logger) {
    try {
        const enrollment = await db.academic_enrollment.delete({
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
export {
    deleteAcademicEnrollment
}