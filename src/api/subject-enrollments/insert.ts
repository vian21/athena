import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newsubjectEnrollments(subjectEnrollmentsObject: any, db: PrismaClient, logger: Logger) {
    try {

        await db.subject_enrollments.create({
            data: subjectEnrollmentsObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create subject enrollment" }
    }

}