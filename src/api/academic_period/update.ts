import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

/*
 * update  a student academic period  
 * @param {number} periodid - period's id
 * @param {object} newData - object with the field(s) to update and their new values
 * @param {object} db - database object                    
 * @param {object}logger- logging object            
 * @returns {object} - success or error object
 *
 */
async function updateAcademicPeriod(periodId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.academic_periods.update({
            where: {
                id: periodId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export {
    updateAcademicPeriod,
}