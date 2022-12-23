import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

/*
 * 
 * Fetches all students enrollemnts
 * @param {object} db - database object                     
 * @param {object} logger- logging object            
 * @returns {array} - all academic enrollments
 *
 */
async function getAcademicEnrollments(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.academic_enrollment.findMany({
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                grade: true
            }
        });


    } catch (error: any) {
        logger.log(error.message);

        return {
            error: "Error getting academic enrollments"
        }
    }
}

/*
 * 
 * Fetches a student enrollemnts
 * @param {number} enrollmentId- enrollmentnumber 
 * @param {object} db - database object                     
 * @param {object} logger- logging object            
 * @returns {object} - enrollment object
 *
 */
async function getAcademicEnrollment(
    enrollmentId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.academic_enrollment.findUnique({
            where: {
                id: enrollmentId,
            },
            select: {
                id: true,
                student_id: true,
                academic_period_id: true,
                grade: true
            },
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}


export {
    getAcademicEnrollment,
    getAcademicEnrollments,
}