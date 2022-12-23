import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getAssessments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.assessments.findMany({
            select: {
                id: true,
                subject_id: true,
                type: true
            }
        });

    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}


async function getAssessment(
    schoolId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.assessments.findUnique({
            where: {
                id: schoolId,
            },
            select: {
                id: true,
                subject_id: true,
                type: true,

            },
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getAssessments,
    getAssessment
}