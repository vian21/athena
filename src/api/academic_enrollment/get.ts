import { academicEnrollmentSelect, Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getAcademicEnrollments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.academic_enrollments.findMany({
            select: academicEnrollmentSelect
        });


    } catch (error: any) {
        logger.log(error.message);

        return {
            error: "Error getting academic enrollments"
        }
    }
}

async function getAcademicEnrollment(
    enrollmentId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.academic_enrollments.findUnique({
            where: {
                id: enrollmentId,
            },
            select: academicEnrollmentSelect
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}


export {
    getAcademicEnrollment,
    getAcademicEnrollments,
}