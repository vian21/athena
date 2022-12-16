import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getMark(
    markId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const mark = await db.marks.findUnique({
            where: {
                id: markId,
            },
            select: {
                id: true,
                subject_id: true,
                student_id: true,
                mark: true,
                academic_period_id: true,
                assessment_id: true,
            },
        });

        return mark;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}


async function getMarks(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const marks = await db.marks.findMany();

        return marks;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


