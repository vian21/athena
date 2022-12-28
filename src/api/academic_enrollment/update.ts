import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";
/*
 * 
 * update a student enrollments
 * @param {number} enrollmentId - enrollment id
 * @param {object} newData - object with the field(s) to update and their new values
 * @param {object} db - database object                     
 * @param {object} logger- logging object            
 * @returns {object} - success or error object
 *
 */
export default async function updateAcademicEnrollment(enrollmentId: Id, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.academic_enrollments.update({
            where: {
                id: enrollmentId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}