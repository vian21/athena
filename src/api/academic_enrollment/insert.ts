import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newAcademicEnrollment(enrollmentObject: any, db: PrismaClient, logger: Logger) {
    try {

        const academic = await db.academic_enrollments.create({
            data: enrollmentObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot enroll" }
    }

}
