import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

/*
 *
 * Fetches all academic periods
 * @param {object} db - database object
 * @param {object} logger- logging object
 * @returns {array} - all academic periods
 *
 */

async function getAcademicPeriods(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.academic_periods.findMany();
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}
/*
 *
 * Fetches a student  academic periods
 * @param {number} periodId - period id
 * @param {object} db - database object
 * @param {object} logger- logging object
 * @return {object} - academic period object
 *
 */
async function getAcademicPeriod(
    periodId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.academic_periods.findUnique({
            where: {
                id: periodId,
            },
            select: {
                id: true,
                start_date: true,
                end_date: true,
                type: true,
            },
        });
    } catch (error: any) {
        logger.log(error);

        return { error: "Error getting academic period" };
    }
}
export { getAcademicPeriods, getAcademicPeriod };
