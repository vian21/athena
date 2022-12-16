import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateAcademicEnrollment(enrollmentId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateEnrollment = await db.academic_enrollment.update({
            where: {
                id: enrollmentId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export {
    updateAcademicEnrollment
}