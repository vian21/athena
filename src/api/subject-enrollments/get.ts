import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSubjectEnrollments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const subjectsEnrollment = await db.subject_enrollment.findMany({
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                finished: true
            }
        });

        return subjectsEnrollment;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


async function getSubjectEnrollment(
    subject_id: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const subject = await db.subject_enrollment.findUnique({
            where: {
                id: subject_id,
            },
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                finished: true
            },
        });

        return subject;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export = {
    getSubjectEnrollments,
    getSubjectEnrollment
}