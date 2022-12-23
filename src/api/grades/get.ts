import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getGrades(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.grade.findMany({
            select: {
                id: true,
                school_id: true,
                academic_period_id: true,
                schools: true,
            }
        });


    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}


async function getGrade(
    grade_id: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.grade.findUnique({
            where: {
                id: grade_id,
            },
            select: {
                id: true,
                school_id: true,
                academic_period_id: true,
                schools: true,
            },
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export {
    getGrades,
    getGrade
}
