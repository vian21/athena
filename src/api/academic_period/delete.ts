import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";
/*
 * Delete an academic period
 * @param {number} periodid - enrollment number
 * @param {object} db - database object
 * @param {object}logger- logging object
 * @returns {object} - success or error object
 *
 */
export default async function deleteAcademicPeriod(
    periodId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.academic_periods.delete({
            where: {
                id: periodId,
            },
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting academic period" };
    }
}
