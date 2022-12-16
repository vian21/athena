import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getGrades(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const Grades = await db.grade.findMany({
            select: {
                id: true,
                school_id: true,
                academic_period_id: true,
                schools: true,
            }
        });

        return Grades;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


async function getGrade(
    school_id: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const Grade = await db.grade.findUnique({
            where: {
                id: school_id,
            },
            select: {
                id: true,
                school_id: true,
                academic_period_id: true,
                schools: true,
            },
        });

        return Grade;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export = {
    getGrades,
    getGrade
}
