import { gradeSelect, Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getGrades(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.grades.findMany({
            select: gradeSelect
        });


    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}


async function getGrade(
    grade_id: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.grades.findUnique({
            where: {
                id: grade_id,
            },
            select: gradeSelect
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
