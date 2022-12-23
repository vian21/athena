import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";
/*
 * delete a student  enrollments 
 * @param {number} enrollmentid - enrollment number
 * @param {object} db - database object                    
 * @param {object}logger- logging object            
 * @returns {object} - success or error object
 *
 */
async function deleteAcademicEnrollment(enrollmentId: number, db: PrismaClient, logger: Logger) {
    try {
        await db.academic_enrollment.delete({
            where: {
                id: enrollmentId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting academic enrollment" };
    }
}
export {
    deleteAcademicEnrollment
}