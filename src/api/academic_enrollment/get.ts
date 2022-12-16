import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getAcademicEnrollment(
    enrollmentId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const enrollment = await db.academic_enrollment.findUnique({
            where: {
                id: enrollmentId,
            },
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                grade: true
            },
        });

        return enrollment;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}


async function getAcademicEnrollments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const academicEnrollments = await db.academic_enrollment.findMany({
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                grade: true
            }
        });
        return academicEnrollments;
    } catch (error: any) {
        logger.log(error.message);

        return {
            error: "Error getting academic enrollments"
        }
    }
}
export {
    getAcademicEnrollment,
    getAcademicEnrollments,
}