import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSubjectEnrollments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.subject_enrollments.findMany({
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                finished: true,
            },
        });
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

async function getSubjectEnrollment(
    subject_id: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.subject_enrollments.findUnique({
            where: {
                id: subject_id,
            },
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                finished: true,
            },
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export { getSubjectEnrollments, getSubjectEnrollment };
